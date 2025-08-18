import type { Metadata } from "next";
import "./globals.css";
import { geist } from "./fonts";
import { Toaster } from "@/components/ui/sonner";
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
      <body className={`${geist.className} bg-gray-100`}>
        <div className="relative main-container">
          <Toaster position="top-center" richColors />
          <Header />
          <div className="content-container p-5 space-y-5">
            {children}
          </div>
          <Toolbar />
        </div>
      </body>
    </html>
  );
}
