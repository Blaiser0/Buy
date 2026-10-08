// Server-side, one-time maintenance. Password comes from stdin, never source or logs.
import nextEnv from '@next/env';
import { createClient } from '@supabase/supabase-js';
import assert from 'node:assert/strict';

async function main() {
  const emailIndex = process.argv.indexOf('--email');
  const email = (emailIndex >= 0 ? process.argv[emailIndex + 1] : 'sugterra84@gmail.com')?.trim().toLowerCase();
  assert.ok(email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), 'Indica un correo válido con --email');
  const checkOnly = process.argv.includes('--check');
  assert.ok(checkOnly || process.argv.includes('--apply'), 'Se requiere --check o --apply');
  nextEnv.loadEnvConfig(process.cwd(), false, { info() {}, error() {} });
  assert.ok(process.env.SUPABASE_SECRET_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL, 'Falta configuración privada');
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  const { error: schemaError } = await db.from('products').select('id,is_visible').limit(1);
  assert.ok(!schemaError, 'Aplica y verifica primero la migración de visibilidad y permisos');
  let account;
  for (let page = 1;; page++) {
    const { data, error } = await db.auth.admin.listUsers({ page, perPage: 1000 });
    assert.ok(!error, 'No se pudo comprobar la cuenta');
    account = data.users.find(u => u.email?.toLowerCase() === email);
    if (account || data.users.length < 1000) break;
  }
  if (checkOnly) {
    if (!account) { console.log('La cuenta no existe. No se realizaron cambios.'); return; }
    const { data, error } = await db.from('profiles').select('is_admin').eq('id', account.id).maybeSingle();
    assert.ok(!error, 'No se pudo verificar el perfil existente');
    console.log(data?.is_admin ? 'La cuenta ya existe y es administradora. No se realizaron cambios.' : 'La cuenta ya existe y no es administradora. No se realizaron cambios.');
    return;
  }
  // Never reset an existing account password or silently grant it new privileges.
  if (account) {
    const { data, error } = await db.from('profiles').select('is_admin').eq('id', account.id).maybeSingle();
    assert.ok(!error && data?.is_admin, 'La cuenta ya existe sin rol administrador; requiere revisión antes de otorgarlo');
    console.log('La cuenta administradora ya existe; no se modificó su contraseña.');
    return;
  }
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const password = Buffer.concat(chunks).toString('utf8').replace(/\r?\n$/, '');
  assert.ok(password.length >= 8 && password.length <= 128, 'Se requiere una contraseña de 8 a 128 caracteres por stdin');
  const { data, error } = await db.auth.admin.createUser({ email, password, email_confirm: true });
  assert.ok(!error && data.user, 'Supabase rechazó la creación; verifica las políticas de contraseña');
  const { error: profileError } = await db.from('profiles').upsert({ id: data.user.id, is_admin: true, full_name: 'Administración Buyú Beauty' });
  assert.ok(!profileError, 'Cuenta creada, pero no se pudo asignar el rol; requiere revisión');
  const { data: profile, error: verifyError } = await db.from('profiles').select('is_admin').eq('id', data.user.id).single();
  assert.ok(!verifyError && profile.is_admin, 'No se pudo verificar el rol');
  console.log('Cuenta administradora creada y rol verificado.');
}
main().catch(e => { console.error(e instanceof assert.AssertionError ? e.message.split('\n')[0] : 'No se pudo completar la configuración de la cuenta.'); process.exitCode = 1; });
