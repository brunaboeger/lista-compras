"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { data: session } = useSession();
  const username = session?.user?.name;

  if (!session) return;

  return (
    <header className="p-5 border-b shadow bg-gray-950 text-white sticky top-0">
      <div className="flex items-center justify-between max-w-[1040px] mx-auto">
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div className="flex items-center justify-center border rounded-full w-[40px] h-[40px] bg-white text-gray-950">
            {username?.charAt(0)}
          </div>
          <h3 className="font-medium">{username}</h3>
        </div>
        <Button className="cursor-pointer" onClick={() => signOut()}>Sair</Button>
      </div>
    </header>
  )
}