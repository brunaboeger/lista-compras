import "./globals.css";
import type { Metadata } from "next";
import { geist } from "./fonts";
import Content from "@/components/Content";

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
        <Content>
          {children}
        </Content>
      </body>
    </html>
  );
}
