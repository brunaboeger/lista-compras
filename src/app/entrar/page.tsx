"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    if (result?.ok) {
      router.push("/");
    } else {
      alert(result?.error);
    }
  }

  return (
    <div className="h-full w-full flex items-center">
      <section className="flex flex-col w-full mx-auto max-w-[600px] gap-4 p-5 bg-white rounded-2xl border text-center">
        <h1 className="font-bold text-2xl">Acessar ambiente</h1>
        <form onSubmit={handleLogin} className="space-y-3">
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" className="cursor-pointer w-full">Entrar</Button>
        </form>
        <Button type="submit" className="cursor-pointer w-full" variant="ghost" onClick={() => redirect("/cadastrar")}>Criar conta</Button>
      </section>
    </div>
  );
}

export default LoginPage;