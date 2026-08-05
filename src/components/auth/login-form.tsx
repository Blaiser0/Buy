"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { loginAction, type AuthState } from "@/actions/auth";
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
      {pending ? "Entrando..." : "Iniciar sesión"}
    </Button>
  );
}

export function LoginForm({ nextPath }: { nextPath?: string }) {
  const [state, formAction] = useActionState(loginAction, {} as AuthState);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={nextPath || "/admin/products"} />
      {state.error && (
        <Alert variant="destructive">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input id="password" name="password" type="password" required />
      </div>
      <SubmitButton />
      <p className="text-center text-sm text-[#2C2C2C]/70">
        ¿No tienes cuenta?{" "}
        <Link href="/register" className="text-[#E50914] hover:underline">
          Regístrate
        </Link>
      </p>
    </form>
  );
}
