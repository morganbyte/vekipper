import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

import { SiteHeader } from "@/components/app-shell/site-header";
import { EnvBadge } from "@/components/env-badge";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

// Geist Mono es la única fuente de Vekipper (texto, títulos y código).
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vekipper",
  description: "Tu día, en un solo vistazo.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: next-themes añade la clase del tema antes de hidratar.
    <html lang="es" className={`${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <SiteHeader />
          {children}
          <Toaster position="bottom-center" />
          <EnvBadge />
        </ThemeProvider>
      </body>
    </html>
  );
}
