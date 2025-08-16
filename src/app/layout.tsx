import type { Metadata } from "next";
import "./globals.css";
import { geist } from "./fonts";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";

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
        <Toaster position="top-center" richColors />
        <Header />
        {children}
      </body>
    </html>
  );
}
