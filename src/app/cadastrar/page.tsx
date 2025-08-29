"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const CreateUserPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })

    if (response.ok) {
      toast.success("Usuário criado com sucesso");
      router.push("/entrar");
    } else {
      const data = await response.json();
      toast(data.error || "Erro ao registrar");
    }
  }

  return (
    <div className="h-full w-full flex items-center">
      <section className="flex flex-col w-full mx-auto max-w-[600px] gap-4 p-5 bg-white rounded-2xl border text-center">
        <h1 className="font-bold text-2xl">Criar conta nova</h1>
        <form onSubmit={handleRegister} className="space-y-3">
          <Input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            className="cursor-pointer w-full"
          >
            Criar conta
          </Button>
        </form>
      </section>
    </div>
  );
}

export default CreateUserPage;