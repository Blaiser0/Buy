import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { z } from 'zod';

function load(path, imports = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  vm.runInNewContext(code, { exports, File, crypto, require(name) {
    assert.ok(name in imports, name);
    return imports[name];
  } });
  return exports;
}
const schema = load('src/schemas/brand-image.ts', { zod: { z } });
const presentation = load('src/lib/products/brands.ts');
assert.equal(presentation.getBrandLogoPath({ slug: 'tocobo', logo_url: null }), '/brands/tocobo.png');
assert.equal(presentation.getProductBrand({ brand: { id: '1', name: 'New', slug: 'new', is_visible: true, logo_url: 'https://example.test/logo.png' } }).logoPath, 'https://example.test/logo.png');
let saved, uploaded, removed, dbError = null, authorized = true;
const storage = {
  async uploadProductImage(file, path) { uploaded = { file, path }; return { path, publicUrl: `https://example.test/${path}` }; },
  async deleteProductImage(path) { removed = path; },
};
const action = load('src/actions/brands.ts', {
  zod: { z }, 'next/cache': { revalidatePath() {} },
  '@/lib/auth/require-admin': { async assertAdminOrThrow() { if (!authorized) throw new Error('Denied'); } },
  '@/lib/db': { getDb: () => ({ storage }) },
  '@/schemas/brand-image': schema,
  '@/lib/supabase/server': { createClient: async () => ({ from: () => ({
    async insert(data) { saved = data; return { error: dbError }; },
    update(data) { saved = data; return { eq: () => ({ select: () => ({ single: async () => ({ error: dbError }) }) }) }; },
  }) }) },
}).saveBrandAction;
function form(operation, file) {
  const data = new FormData();
  data.set('name', 'Test logo'); data.set('operation', operation);
  data.set('id', '12345678-1234-4234-8234-123456789012');
  if (file) data.set('logo', file);
  return data;
}
const png = new File(['test'], 'logo.png', { type: 'image/png' });
assert.ok((await action({}, form('create', png))).success);
assert.match(saved.logo_url, /brand-logos\/.*\.png$/);
assert.equal(uploaded.file.size, 4);
uploaded = undefined;
assert.ok((await action({}, form('update'))).success);
assert.equal('logo_url' in saved, false); // Preserve existing logo when no file selected.
assert.equal(uploaded, undefined);
assert.ok((await action({}, form('update', png))).success);
assert.ok(saved.logo_url);
uploaded = undefined;
for (const operation of ['hide', 'show']) {
  const data = new FormData();
  data.set('id', '12345678-1234-4234-8234-123456789012');
  data.set('operation', operation);
  assert.ok((await action({}, data)).success);
  assert.equal(saved.is_visible, operation === 'show');
  assert.equal(uploaded, undefined);
}
assert.ok((await action({}, form('create', new File(['svg'], 'logo.svg', { type: 'image/svg+xml' })))).error);
assert.ok((await action({}, form('create', new File([new Uint8Array(512 * 1024 + 1)], 'large.png', { type: 'image/png' })))).error);
assert.equal(uploaded, undefined);
dbError = { code: '23505' };
assert.ok((await action({}, form('create', png))).error);
assert.equal(removed, uploaded.path);
uploaded = undefined; authorized = false;
assert.ok((await action({}, form('create', png))).error);
assert.equal(uploaded, undefined);
console.log('OK: logo selection, upload/save, replacement, preservation, size/type validation, failed-upload cleanup and admin guard.');
