// Node-only import entry point. Never import this file from src/ or a client bundle.
// Default: read-only dry run. Writes require the explicit --apply flag.
import nextEnv from '@next/env';
import { createClient } from '@supabase/supabase-js';
import { readFile, writeFile, open, unlink } from 'node:fs/promises';
import assert from 'node:assert/strict';

const directory = 'reports/catalog-import';
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

async function main() {
  const args = process.argv.slice(2);
  assert.ok(args.length <= 1 && args.every(arg => ['--apply', '--dry-run', '--check-config'].includes(arg)));
  // Silence loader errors too: never log environment contents or raw SDK errors.
  nextEnv.loadEnvConfig(process.cwd(), false, { info() {}, error() {} });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    console.error('Falta NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SECRET_KEY en el entorno local.');
    process.exitCode = 1;
    return;
  }
  assert.equal(new URL(url).protocol, 'https:');
  const payloads = JSON.parse(await readFile(`${directory}/approved-payload.json`, 'utf8'));
  const reviewed = JSON.parse(await readFile(`${directory}/dry-run.json`, 'utf8'));
  const approved = reviewed.filter(p => p.status === 'NUEVO');
  assert.equal(approved.length, 45);
  assert.equal(payloads.length, approved.length);
  assert.equal(new Set(payloads.map(p => normalize(p.name))).size, payloads.length);
  for (const p of payloads) {
    const source = approved.find(item => item.name === p.name);
    assert.ok(source && source.sourceText.includes(p.description) && p.description.trim());
    assert.deepEqual(Object.keys(p).sort(), ['category', 'description', 'image_url', 'name', 'price', 'stock_quantity']);
    assert.equal(p.price, source.price);
    assert.equal(p.category, source.category);
    assert.ok(Number.isFinite(p.price) && p.price > 0);
    assert.equal(p.stock_quantity, 0);
    assert.equal(p.image_url, null);
  }
  if (args.includes('--check-config')) {
    console.log('Configuración local presente y 45 candidatos validados. Sin conexión ni escrituras.');
    return;
  }
  const db = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  async function listProducts() {
    const rows = [];
    for (let from = 0;; from += 1000) {
      const { data, error } = await db.from('products').select('*').order('id').range(from, from + 999);
      if (error) throw new Error('Lectura fallida');
      rows.push(...data);
      if (data.length < 1000) return rows;
    }
  }
  const apply = args.includes('--apply');
  // Prevent overlapping copies of this local importer. Do not run other import
  // mechanisms concurrently: REST cannot enforce uniqueness without a DB constraint.
  const lockPath = `${directory}/import.lock`;
  const lock = apply ? await open(lockPath, 'wx') : null;
  try {
    const before = await listProducts();
    const results = [];
    for (const p of payloads) {
      // Requery before each insert, including on retries after interrupted runs.
      const current = apply ? await listProducts() : before;
      if (current.some(row => normalize(row.name) === normalize(p.name))) {
        results.push({ name: p.name, status: 'EXISTE' });
        continue;
      }
      if (!apply) {
        results.push({ name: p.name, status: 'CREARIA' });
        continue;
      }
      try {
        const { data, error } = await db.from('products').insert(p).select('id').single();
        // Never blindly retry an uncertain write. A subsequent run rechecks names.
        results.push({ name: p.name, status: error ? 'ERROR' : 'CREADO', ...(data ? { id: data.id } : {}) });
      } catch {
        results.push({ name: p.name, status: 'ERROR_VERIFICAR' });
      }
    }
    const after = apply ? await listProducts() : before;
    const sameRow = (a, b) => b && Object.keys(a).every(k => a[k] === b[k]);
    const unchanged = before.every(p => sameRow(p, after.find(row => row.id === p.id)));
    const duplicateNames = payloads.filter(p => after.filter(row => normalize(row.name) === normalize(p.name)).length > 1).map(p => p.name);
    const report = { mode: apply ? 'apply' : 'dry-run', before: before.length, after: after.length,
      originalRecordsUnchanged: unchanged, duplicateNames,
      originallyExisting: reviewed.filter(p => p.status === 'EXISTE').length,
      pending: reviewed.filter(p => p.status === 'REVISAR').map(p => p.name), results };
    await writeFile(`${directory}/import-${apply ? 'result' : 'preview'}.json`, JSON.stringify(report, null, 2));
    console.log(JSON.stringify({ mode: report.mode, before: report.before, after: report.after,
      created: results.filter(r => r.status === 'CREADO').length,
      wouldCreate: results.filter(r => r.status === 'CREARIA').length,
      skipped: results.filter(r => r.status === 'EXISTE').length,
      pending: report.pending.length, errors: results.filter(r => r.status.startsWith('ERROR')).length,
      originalRecordsUnchanged: unchanged, duplicateNames: duplicateNames.length }));
    if (!unchanged || duplicateNames.length || results.some(r => r.status.startsWith('ERROR'))) process.exitCode = 1;
  } finally {
    if (lock) { await lock.close(); await unlink(lockPath); }
  }
}

main().catch(() => {
  console.error('Importación detenida. Revisa configuración, permisos, archivos aprobados o bloqueo de ejecución. No se muestran credenciales ni errores de red sin filtrar.');
  process.exitCode = 1;
});
