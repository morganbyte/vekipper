import { redirect } from "next/navigation";
import { Suspense } from "react";

import { signInWithGoogle } from "@/app/auth/actions";
import { FadeIn } from "@/components/dashboard/fade-in";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { safeNextPath } from "@/lib/safe-next-path";

const errors: Record<string, string> = {
  oauth: "No se pudo iniciar sesión con Google. Inténtalo de nuevo.",
  callback: "Google no completó el inicio de sesión. Inténtalo de nuevo.",
};

export default function LoginPage(props: PageProps<"/login">) {
  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-8 px-6 py-16">
      <FadeIn>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Inicia sesión</h1>
          <p className="text-sm text-muted-foreground">
            Usa tu cuenta de Google para entrar en Vekipper.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.08}>
        <Suspense fallback={<div className="h-9 rounded-lg bg-muted" />}>
          <LoginForm searchParams={props.searchParams} />
        </Suspense>
      </FadeIn>
    </main>
  );
}

async function LoginForm({ searchParams }: Pick<PageProps<"/login">, "searchParams">) {
  const { next, error } = await searchParams;
  const nextPath = safeNextPath(next);

  if (await getCurrentUser()) redirect(nextPath);

  return (
    <form action={signInWithGoogle} className="flex flex-col gap-3">
      <input type="hidden" name="next" value={nextPath} />
      <Button type="submit" variant="outline" size="lg" className="w-full">
        <GoogleIcon />
        Continuar con Google
      </Button>
      {typeof error === "string" && errors[error] && (
        <p className="text-sm text-destructive">{errors[error]}</p>
      )}
    </form>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.1 3.5-8.8z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8l4-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.8 3.6-4.9 6.7-4.9z" />
    </svg>
  );
}
