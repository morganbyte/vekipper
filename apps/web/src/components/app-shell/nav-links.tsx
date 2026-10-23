"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Hoy" },
  { href: "/feedback", label: "Feedback" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1">
      {links.map(({ href, label }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        // Al ir a feedback se recuerda desde qué página venía el usuario.
        const target = href === "/feedback" && !active ? `/feedback?from=${encodeURIComponent(pathname)}` : href;

        return (
          <Link
            key={href}
            href={target}
            className={cn(
              "relative rounded-md px-3 py-1.5 text-sm transition-colors",
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {active && (
              // layoutId hace que el fondo "se deslice" de un enlace al otro.
              <motion.span
                layoutId="nav-active"
                className="absolute inset-0 -z-10 rounded-md bg-muted"
                transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
              />
            )}
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
