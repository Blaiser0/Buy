import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { createRequire } from 'node:module';

const source = fs.readFileSync('src/schemas/login.ts', 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const exportsObject = {};
vm.runInNewContext(compiled, { exports: exportsObject, require: createRequire(import.meta.url) });
const { loginSchema } = exportsObject;
for (const email of ['', "' OR 1=1 --", 'SELECT * FROM products', 'a@', 'a'.repeat(255) + '@example.com']) {
  assert.equal(loginSchema.safeParse({ email, password: 'test-password' }).success, false);
}
for (const password of ['', 'a'.repeat(129), null, {}]) {
  assert.equal(loginSchema.safeParse({ email: 'admin@example.com', password }).success, false);
}
// Password characters are opaque credentials: don't strip or reinterpret SQL-like text.
const literalPassword = " ' OR 1=1; -- ";
const valid = loginSchema.parse({ email: ' admin@example.com ', password: literalPassword });
assert.equal(valid.email, 'admin@example.com');
assert.equal(valid.password, literalPassword);
const action = fs.readFileSync('src/actions/auth.ts', 'utf8');
assert.ok(action.includes('signInWithPassword(parsed.data)'));
assert.ok(action.includes('redirect("/admin/products")'));
assert.ok(!action.includes('redirect(next'));
console.log('Validación login: OK (correo, longitud, contraseña literal y destino fijo).');
