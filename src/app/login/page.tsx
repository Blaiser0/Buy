import { LoginForm } from "@/components/auth/login-form";
import { BrandLogo } from "@/components/layout/brand-logo";

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-[#F8F6F0] p-8">
        <div className="space-y-2 text-center">
          <BrandLogo className="justify-center" imageClassName="h-10 md:h-12" />
          <h1 className="text-xl font-medium text-[#2C2C2C]">
            Iniciar sesión
          </h1>
          <p className="text-sm text-[#2C2C2C]/70">
            Accede al panel de administración
          </p>
        </div>
        <LoginForm nextPath={params.next} />
      </div>
    </div>
  );
}
