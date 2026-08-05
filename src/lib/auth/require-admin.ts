import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getDb } from "@/lib/db";

export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const db = getDb();
  const isAdmin = await db.profiles.isAdmin(user.id);

  if (!isAdmin) {
    redirect("/");
  }

  return { user, supabase };
}

export async function assertAdminOrThrow() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Debes iniciar sesión para continuar.");
  }

  const db = getDb();
  const isAdmin = await db.profiles.isAdmin(user.id);

  if (!isAdmin) {
    throw new Error("No tienes permisos de administrador.");
  }

  return { user, supabase };
}
