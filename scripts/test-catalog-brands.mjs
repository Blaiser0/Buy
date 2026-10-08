import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

let rows = [
  { id: '1', name: 'Nueva sin productos', slug: 'nueva', is_visible: true, logo_url: '/logo.png' },
  { id: '2', name: 'Oculta', slug: 'oculta', is_visible: false, logo_url: null },
];
const output = {};
let adminChecks = 0;
const code = ts.transpileModule(fs.readFileSync('src/lib/db/brands.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
vm.runInNewContext(code, { exports: output, require(name) {
  if (name === 'server-only') return {};
  if (name.endsWith('require-admin')) return { assertAdminOrThrow: async () => { adminChecks++; } };
  if (name.endsWith('supabase/server')) return { createClient: async () => ({ from(table) {
    assert.equal(table, 'brands'); // Must never derive the list from products.
    let filter;
    return { select() { return this; }, eq(column, value) { filter = { column, value }; return this; },
      async order(column) { assert.equal(column, 'name'); return { data: rows.filter(row => !filter || row[filter.column] === filter.value), error: null }; },
    };
  } }) };
  throw new Error(`Unexpected import: ${name}`);
} });
assert.equal((await output.listPublicBrands()).length, 1);
assert.equal((await output.listPublicBrands())[0].name, 'Nueva sin productos');
assert.equal(adminChecks, 0);
rows = rows.map(row => row.id === '1' ? { ...row, name: 'Nombre modificado', logo_url: '/nuevo-logo.png' } : row);
assert.equal((await output.listPublicBrands())[0].name, 'Nombre modificado');
assert.equal((await output.listPublicBrands())[0].logo_url, '/nuevo-logo.png');
assert.equal((await output.listBrands()).length, 2);
assert.equal(adminChecks, 1);
rows = rows.map(row => ({ ...row, is_visible: false }));
assert.equal((await output.listPublicBrands()).length, 0);
console.log('OK: marcas sin productos, cambios de nombre/logo, marcas ocultas y acceso público/admin.');
