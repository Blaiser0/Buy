import { RegisterForm } from "@/components/auth/register-form";
import { BrandLogo } from "@/components/layout/brand-logo";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-[#F8F6F0] p-8">
        <div className="space-y-2 text-center">
          <BrandLogo className="justify-center" imageClassName="h-12 md:h-14" />
          <h1 className="text-xl font-medium text-[#2C2C2C]">Crear cuenta</h1>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
