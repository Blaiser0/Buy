import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source = fs.readFileSync('src/lib/products/search.ts', 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const output = {};
vm.runInNewContext(compiled, {
  exports: output,
  require(name) {
    if (name.endsWith('/categories')) return { PRODUCT_CATEGORIES: [] };
    if (name.endsWith('/brands')) return {};
    throw new Error(`Unexpected import: ${name}`);
  },
});
const products = [
  { id: '1', name: 'SKIN1004 Centella Toner', is_visible: true },
  { id: '2', name: 'Tónico Centella', is_visible: false },
  { id: '3', name: 'Anua Serum', description: 'Centella', is_visible: true },
];
const find = query => Array.from(output.filterProductsByName(products, query), p => p.id);
assert.deepEqual(find('centella'), ['1', '2']);
assert.deepEqual(find('  TONICO   '), ['2']);
assert.deepEqual(find('toner centella'), ['1']);
assert.deepEqual(find(''), ['1', '2', '3']);
assert.deepEqual(find('no-existe'), []);
assert.deepEqual(find("' OR 1=1 --"), []);
console.log('Buscador admin: OK (nombre, ocultos, mayúsculas, tildes, varias palabras, limpiar y sin resultados).');
