"use client";

import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";
import Toolbar from "@/components/Toolbar";

const Content = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SessionProvider>
      <div className="relative main-container">
        <Toaster position="top-center" richColors />
        <Header />
        <div className="content-container p-5 space-y-5">
          {children}
        </div>
        <Toolbar />
      </div>
    </SessionProvider>
  );
}

export default Content;