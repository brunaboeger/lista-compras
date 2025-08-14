"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const ItensPage = () => {
  const [item, setItem] = useState("");
  const [itens, setItens] = useState<string[]>([]);

  // Carregar do localStorage ao abrir a página
  useEffect(() => {
    const saved = localStorage.getItem("itens");
    if (saved) setItens(JSON.parse(saved));
  }, []);

  // Salvar no localStorage sempre que itens mudar
  useEffect(() => {
    localStorage.setItem("itens", JSON.stringify(itens));
  }, [itens]);

  const addItem = () => {
    if (!item.trim()) return;
    setItens([...itens, item.trim()]);
    setItem("");
  }

  return (
    <div className="p-5">
      <div className="p-5 bg-white rounded-2xl border">
        <h1 className="text-2xl font-bold mb-5">Cadastro de itens</h1>
        <div className="flex gap-2 mb-1">
          <Input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Ex: Pão, Shampoo..."
          />
          <Button onClick={addItem}>Adicionar</Button>
        </div>
      </div>
      <div className="p-5 mt-5 bg-white rounded-2xl border">
        <h2 className="text-2xl font-bold mb-5">Itens</h2>
        <ul className="space-y-2">
          {itens.map((i, index) => (
            <li key={index} className="border p-2 rounded">
              {i}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ItensPage;