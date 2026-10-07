"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { loginSchema } from "@/schemas/login";

export type AuthState = {
  error?: string;
  success?: string;
};

export async function loginAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: "Introduce un correo válido y tu contraseña (máximo 128 caracteres)." };

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
    if (error || !data.user) return { error: "Correo o contraseña incorrectos." };
    const { data: profile, error: profileError } = await supabase
      .from("profiles").select("is_admin").eq("id", data.user.id).maybeSingle();
    if (profileError || !profile?.is_admin) {
      await supabase.auth.signOut();
      return { error: "Esta cuenta no tiene acceso al panel de administración." };
    }
  } catch {
    return { error: "No se pudo iniciar sesión. Inténtalo nuevamente." };
  }
  // Fixed destination: never redirect to an untrusted URL from form input.
  redirect("/admin/products");
}

export async function registerAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("full_name") ?? "").trim();

  if (!email || !password) {
    return { error: "Email y contraseña son obligatorios." };
  }

  if (password.length < 6) {
    return { error: "La contraseña debe tener al menos 6 caracteres." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success:
      "Cuenta creada. Si el proyecto requiere confirmación de email, revisa tu bandeja.",
  };
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
