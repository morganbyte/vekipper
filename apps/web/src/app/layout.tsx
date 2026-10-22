import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

import { EnvBadge } from "@/components/env-badge";

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
    <html lang="es" className={`${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <EnvBadge />
      </body>
    </html>
  );
}
