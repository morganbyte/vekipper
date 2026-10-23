import Link from "next/link";
import { Suspense } from "react";

import { NavLinks } from "@/components/app-shell/nav-links";
import { ThemeToggle } from "@/components/app-shell/theme-toggle";
import { UserMenu } from "@/components/app-shell/user-menu";
import { buttonVariants } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";

// La cabecera es estática (sale en el HTML inicial); solo la zona del usuario
// lee la sesión y llega después, dentro de <Suspense>.
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-4xl items-center gap-6 px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          vekipper
        </Link>
        <NavLinks />
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Suspense fallback={<div className="size-7 rounded-full bg-muted" />}>
            <HeaderUser />
          </Suspense>
        </div>
      </div>
    </header>
  );
}

async function HeaderUser() {
  const user = await getCurrentUser();

  return user ? (
    <UserMenu user={user} />
  ) : (
    <Link href="/login" className={buttonVariants({ variant: "outline", size: "sm" })}>
      Iniciar sesión
    </Link>
  );
}
