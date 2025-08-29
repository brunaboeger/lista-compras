"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Toolbar = () => {
  const path = usePathname();
  const { data: session } = useSession();

  if (!session) return;

  return (
    <footer className="absolute w-full bottom-0 border-t bg-white shadow-2xl p-5">
      <div className="max-w-[1040px] mx-auto grid grid-cols-2 gap-2">
        <Button variant={path === "/" ? "default" : "outline"} asChild>
          <Link href="/">Sacola</Link>
        </Button>
        <Button variant={path === "/itens" ? "default" : "outline"} asChild>
          <Link href="/itens">Cadastrados</Link>
        </Button>
      </div>
    </footer>
  );
}

export default Toolbar;