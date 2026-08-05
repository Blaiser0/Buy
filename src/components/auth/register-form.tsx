"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { registerAction, type AuthState } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-[#E50914] text-white hover:bg-[#C40812]"
    >
      {pending ? "Creando cuenta..." : "Crear cuenta"}
    </Button>
  );
}

export function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, {} as AuthState);

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <Alert variant="destructive">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
      {state.success && (
        <Alert>
          <AlertDescription>{state.success}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="full_name">Nombre</Label>
        <Input id="full_name" name="full_name" type="text" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
        />
      </div>
      <SubmitButton />
      <p className="text-center text-sm text-[#2C2C2C]/70">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="text-[#E50914] hover:underline">
          Inicia sesión
        </Link>
      </p>
    </form>
  );
}
