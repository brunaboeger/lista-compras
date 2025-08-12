import type { Metadata } from "next";
import "./globals.css";
import { geist } from "./fonts";
import Header from "@/components/Header";
import Toolbar from "@/components/Toolbar";

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
      <body className={`${geist.className} flex flex-col bg-gray-100`}>
        <Header />
        {children}
        <Toolbar />
      </body>
    </html>
  );
}
