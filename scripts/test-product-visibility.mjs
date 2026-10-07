import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const rows = [
  { id: 'visible', name: 'Visible', price: 1, stock_quantity: 0, is_visible: true },
  { id: 'hidden', name: 'Hidden', price: 1, stock_quantity: 0, is_visible: false },
];
function query() {
  let id;
  return {
    select() { return this; },
    eq(_column, value) { id = value; return this; },
    async order() { return { data: rows, error: null }; },
    async maybeSingle() { return { data: rows.find(p => p.id === id) ?? null, error: null }; },
  };
}
const exportsObject = {};
const source = fs.readFileSync('src/lib/db/providers/supabase/products.ts', 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
vm.runInNewContext(compiled, {
  exports: exportsObject, process, console,
  require(name) {
    assert.equal(name, '@/lib/supabase/server');
    return { createClient: async () => ({ from: query }) };
  },
});
(async () => {
  const repo = exportsObject.supabaseProductRepository;
  assert.equal((await repo.list()).length, 1);
  assert.equal((await repo.list({ includeHidden: true })).length, 2);
  assert.equal(await repo.getById('hidden'), null);
  assert.equal((await repo.getById('hidden', { includeHidden: true })).is_visible, false);
  assert.equal((await repo.getById('visible')).stock_quantity, 0);
  console.log('Visibilidad: OK (listas públicas, detalle oculto, administración, stock intacto).');
})().catch(e => { console.error(e); process.exitCode = 1; });
