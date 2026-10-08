import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function load(path, imports = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(path, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  vm.runInNewContext(code, { exports, process, console, require(name) {
    assert.ok(name in imports, `Unexpected import: ${name}`);
    return imports[name];
  } });
  return exports;
}
const brands = load('src/lib/products/brands.ts');
const search = load('src/lib/products/search.ts', {
  '@/lib/products/brands': brands,
  '@/lib/products/categories': { PRODUCT_CATEGORIES: [] },
});
const tocobo = { id: 'brand-1', name: 'TOCOBO', slug: 'tocobo', is_visible: true };
const custom = { id: 'brand-2', name: 'Nueva marca', slug: 'nueva-marca', is_visible: true };
const products = [
  { id: '1', name: 'Serum sin marca en el nombre', brand_id: tocobo.id, brand: tocobo, is_visible: true },
  { id: '2', name: 'TOCOBO nombre antiguo', brand_id: custom.id, brand: custom, is_visible: true },
  { id: '3', name: 'TOCOBO sin asignar', brand_id: null, brand: null, is_visible: true },
  { id: '4', name: 'Oculto por marca', brand_id: 'hidden-brand', brand: { ...tocobo, id: 'hidden-brand', is_visible: false }, is_visible: true },
  { id: '5', name: 'Producto oculto', brand_id: tocobo.id, brand: tocobo, is_visible: false },
];
assert.equal(search.filterProductsByBrand(products, 'tocobo').map(p => p.id).join(','), '1,5');
assert.equal(search.filterProductsByBrand(products, 'nueva-marca')[0].id, '2');
assert.equal(brands.getProductBrand(products[2]), null);
assert.equal(brands.getProductBrand(products[3]), null);
assert.equal(brands.getProductBrand(products[1]).logoPath, '');
assert.equal(search.getAvailableBrands(products).length, 2);
assert.equal(brands.groupProductsByBrand(products).length, 2);

const repository = load('src/lib/db/providers/supabase/products.ts', {
  '@/lib/supabase/server': { createClient: async () => ({ from() {
    let id;
    return { select() { return this; }, eq(_key, value) { id = value; return this; },
      async order() { return { data: products, error: null }; },
      async maybeSingle() { return { data: products.find(p => p.id === id), error: null }; },
    };
  } }) },
}).supabaseProductRepository;
assert.equal((await repository.list()).length, 3);
assert.equal((await repository.list({ includeHidden: true })).length, 5);
assert.equal(await repository.getById('4'), null);
assert.equal((await repository.getById('4', { includeHidden: true })).id, '4');
console.log('OK: marca explícita, nombre independiente, marcas nuevas, sin marca y visibilidad pública/admin.');
