import type { Metadata } from "next";
import "./globals.css";
import { winky } from "./fonts";

export const metadata: Metadata = {
  title: "Mercado",
  description: "Lista de compras para mercado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${winky.className}`}>
        {children}
      </body>
    </html>
  );
}
