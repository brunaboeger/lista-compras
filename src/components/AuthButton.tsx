"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

const AuthButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Olpa, {session.user?.name}</p>
        <Button onClick={() => signOut()}>Sair</Button>
      </div>
    )
  }

  return <Button onClick={() => signIn("google")}>Entrar com Google</Button>;
}

export default AuthButton;