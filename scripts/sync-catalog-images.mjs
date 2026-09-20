// Node-only maintenance: only fill empty product images; never overwrite files.
import nextEnv from '@next/env';
import { createClient } from '@supabase/supabase-js';
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import sharp from 'sharp';

async function main() {
  const args = process.argv.slice(2);
  assert.ok(args.length <= 1 && args.every(x => ['--apply', '--dry-run'].includes(x)));
  const apply = args.includes('--apply');
  nextEnv.loadEnvConfig(process.cwd(), false, { info() {}, error() {} });
  assert.ok(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SECRET_KEY, 'Falta configuración privada');
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  async function list() {
    const rows = [];
    for (let start = 0;; start += 1000) {
      const { data, error } = await db.from('products').select('*').order('id').range(start, start + 999);
      assert.ok(!error, 'No se pudo consultar products');
      rows.push(...data);
      if (data.length < 1000) return rows;
    }
  }
  const before = await list();
  const normalize = s => s.replace(/:/g, '').trim().toLowerCase().replace(/\s+/g, ' ');
  const folders = (await readdir('public/products', { withFileTypes: true })).filter(d => d.isDirectory());
  const plan = [];
  const pending = [];
  for (const row of before.filter(p => !p.image_url?.trim())) {
    const matches = folders.filter(d => normalize(d.name) === normalize(row.name));
    assert.ok(matches.length <= 1, 'Coincidencia ambigua');
    if (!matches.length) { pending.push(row.name); continue; }
    const file = `public/products/${matches[0].name}/1.jpg`;
    let bytes;
    try { bytes = await readFile(file); } catch (e) { if (e.code !== 'ENOENT') throw e; pending.push(row.name); continue; }
    const info = await sharp(bytes).metadata();
    assert.ok(['jpeg', 'png', 'webp', 'avif'].includes(info.format), 'Formato de imagen no compatible');
    const extension = info.format === 'jpeg' ? 'jpg' : info.format;
    const hash = createHash('sha256').update(bytes).digest('hex');
    const object = `catalog/${row.id}/${hash}.${extension}`;
    const { data } = db.storage.from('products').getPublicUrl(object);
    plan.push({ row, bytes, object, contentType: `image/${info.format}`, url: data.publicUrl });
  }
  const { data: bucket, error: bucketError } = await db.storage.getBucket('products');
  assert.ok(!bucketError && bucket?.public, 'El bucket products debe existir y ser público; no se cambiaron permisos');
  console.log(JSON.stringify({ mode: apply ? 'apply' : 'dry-run', total: before.length, candidates: plan.map(p => p.row.name), pending }, null, 2));
  if (!apply) return;
  const directory = 'reports/catalog-images';
  await mkdir(directory, { recursive: true });
  const run = new Date().toISOString().replace(/[:.]/g, '-');
  await writeFile(`${directory}/${run}-before.json`, JSON.stringify(before, null, 2));
  const updated = [];
  const errors = [];
  for (const item of plan) {
    try {
      const existing = await fetch(item.url);
      if (!existing.ok) {
        const { error } = await db.storage.from('products').upload(item.object, item.bytes, { contentType: item.contentType, upsert: false });
        assert.ok(!error, 'Falló la subida; producto sin modificar');
      }
      const response = await fetch(item.url);
      assert.equal(response.status, 200, 'Imagen pública no accesible');
      const remote = Buffer.from(await response.arrayBuffer());
      assert.ok(remote.equals(item.bytes), 'La imagen pública no coincide');
      let query = db.from('products').update({ image_url: item.url }).eq('id', item.row.id);
      query = item.row.image_url === null ? query.is('image_url', null) : query.eq('image_url', item.row.image_url);
      const { data, error } = await query.select('id');
      assert.ok(!error && data?.length === 1, 'No se actualizó: error o cambio concurrente');
      updated.push({ id: item.row.id, name: item.row.name, image_url: item.url });
    } catch (error) {
      errors.push({ name: item.row.name, error: error instanceof assert.AssertionError ? error.message.split('\n')[0] : 'Falló la operación de red o archivo' });
    }
  }
  const after = await list();
  const discrepancies = [];
  for (const old of before) {
    const current = after.find(p => p.id === old.id);
    const changed = updated.find(p => p.id === old.id);
    const expected = changed ? { ...old, image_url: changed.image_url } : old;
    try { assert.deepEqual(current, expected); } catch { discrepancies.push(old.name); }
  }
  const report = { total: after.length, updated, pending: after.filter(p => !p.image_url?.trim()).map(p => p.name), errors, discrepancies, countUnchanged: before.length === after.length };
  await writeFile(`${directory}/${run}-result.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  if (errors.length || discrepancies.length || !report.countUnchanged) process.exitCode = 1;
}
main().catch(error => { console.error(error instanceof assert.AssertionError ? error.message.split('\n')[0] : 'Operación interrumpida; revisar estado antes de reintentar.'); process.exitCode = 1; });
