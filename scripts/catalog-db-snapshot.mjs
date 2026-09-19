// Read-only dry-run snapshot. No insert/update/delete operations.
import nextEnv from '@next/env';
import { createClient } from '@supabase/supabase-js';
import { mkdir, writeFile } from 'node:fs/promises';
nextEnv.loadEnvConfig(process.cwd());
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, { auth: { persistSession: false } });
const rows = [];
for (let from = 0;; from += 1000) {
  const { data, error } = await db.from('products').select('*').order('id').range(from, from + 999);
  if (error) { console.error('No se pudo leer products:', error.message); process.exit(1); }
  rows.push(...data);
  if (data.length < 1000) break;
}
await mkdir('reports/catalog-import', { recursive: true });
await writeFile('reports/catalog-import/db-snapshot.json', JSON.stringify(rows, null, 2));
console.log('Productos actuales:', rows.length);
for (const row of rows) console.log(row.id, row.name);
