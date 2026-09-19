// Builds payloads from the approved dry run. No network or database writes.
import { readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const dir = 'reports/catalog-import';
const reviewed = JSON.parse(await readFile(`${dir}/dry-run.json`, 'utf8'));
const candidates = reviewed.filter(p => p.status === 'NUEVO');
assert.equal(candidates.length, 45);
assert.equal(reviewed.filter(p => p.status === 'REVISAR').length, 4);
const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const payloads = candidates.map(p => {
  // Keep the literal descriptive span. Only remove title(s), outer blank lines,
  // and the standalone retail price/footer. Never rewrite descriptive text.
  let text = p.sourceText;
  const prices = [...text.matchAll(/^S\s*\/\.?\s*(\d+(?:\.\d+)?)\s*(?:SOLES)?[ \t]*$/gim)];
  assert.equal(prices.length, 1, `Precio no inequívoco: ${p.name}`);
  assert.equal(Number(prices[0][1]), p.price);
  const tail = text.slice(prices[0].index + prices[0][0].length).trim();
  assert.ok(!tail || (p.name.startsWith('TONYMOLY') && tail === 'TOCOBO'), `Texto después del precio: ${p.name}`);
  text = text.slice(0, prices[0].index).trim();
  if (!p.name.startsWith('ANUA Heartleaf') && !p.name.startsWith('Anua PDRN')) {
    const title = text.split('\n')[0];
    // Header can omit the contextual brand added in the reviewed manifest.
    assert.ok(normalize(p.name).includes(normalize(title)), `Título inesperado: ${p.name}`);
    text = text.slice(title.length).trim();
    if (text.startsWith(`${title}\n`)) text = text.slice(title.length).trim();
  }
  assert.ok(text.length > 20);
  assert.ok(p.sourceText.includes(text), `Descripción debe ser un fragmento literal: ${p.name}`);
  return { name: p.name, description: text, price: p.price, stock_quantity: 0, image_url: null, category: p.category };
});
assert.equal(new Set(payloads.map(p => normalize(p.name))).size, 45);
await writeFile(`${dir}/approved-payload.json`, JSON.stringify(payloads, null, 2));
// SQL alternative for an authenticated Supabase SQL editor. Lock serializes
// concurrent executions; repeated executions skip existing normalized names.
const data = JSON.stringify(payloads);
assert.ok(!data.includes('$catalog_import$'));
const key = expr => `btrim(regexp_replace(translate(lower(${expr}), 'áéíóúüñ', 'aeiouun'), '[^a-z0-9]+', ' ', 'g'))`;
const sql = `-- 45 approved candidates only. No updates/deletes/schema changes.\nBEGIN;\nLOCK TABLE public.products IN SHARE ROW EXCLUSIVE MODE;\nWITH candidates AS (\n  SELECT * FROM jsonb_to_recordset($catalog_import$${data}$catalog_import$::jsonb)\n  AS p(name text, description text, price numeric, stock_quantity integer, image_url text, category text)\n), inserted AS (\n  INSERT INTO public.products (name, description, price, stock_quantity, image_url, category)\n  SELECT c.name, c.description, c.price, c.stock_quantity, c.image_url, c.category FROM candidates c\n  WHERE NOT EXISTS (SELECT 1 FROM public.products p WHERE ${key('p.name')} = ${key('c.name')})\n  RETURNING id, name\n)\nSELECT * FROM inserted;\nCOMMIT;\n`;
await writeFile(`${dir}/import-approved.sql`, sql);
console.log('45 payloads verificados: descripción literal, stock 0, imagen null, sin id ni created_at. SQL preparado, NO ejecutado.');
