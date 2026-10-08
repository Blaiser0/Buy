import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const nativeRequire = createRequire(import.meta.url);
const cache = new Map();
function load(path) {
  if (cache.has(path)) return cache.get(path);
  const exports = {};
  cache.set(path, exports);
  const code = ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  vm.runInNewContext(code, { exports, require(name) {
    if (name === '@/actions/brands') return { saveBrandAction: async () => ({ success: 'Test' }) };
    if (name === 'next/image') return { __esModule: true, default: () => null };
    if (name.startsWith('@/')) {
      const base = `src/${name.slice(2)}`;
      return load(fs.existsSync(`${base}.tsx`) ? `${base}.tsx` : `${base}.ts`);
    }
    return nativeRequire(name);
  } });
  return exports;
}
const { BrandsManager } = load('src/components/admin/brands-manager.tsx');
const html = renderToStaticMarkup(React.createElement(BrandsManager, {
  brands: [{ id: '1', name: 'Visible', slug: 'visible', is_visible: true, logo_url: null },
    { id: '2', name: 'Oculta', slug: 'oculta', is_visible: false, logo_url: null }], counts: {},
}));
for (const operation of ['create', 'update']) {
  assert.ok(html.includes(`name="operation" value="${operation}"`), `${operation} must use an always-submitted hidden input`);
}
assert.equal([...html.matchAll(/<button\b[^>]*type="submit"/g)].length, 3);
for (const operation of ['hide', 'show', 'delete']) {
  const buttons = [...html.matchAll(/<button\b[^>]*>/g)].map(match => match[0])
    .filter(button => button.includes(`data-operation="${operation}"`));
  assert.ok(buttons.length, `Missing ${operation} button`);
  for (const button of buttons) {
    assert.match(button, /type="button"/, `${operation} must not submit name/logo fields`);
  }
}
console.log('OK: hidden create/update operation and independent hide/show/delete controls.');
