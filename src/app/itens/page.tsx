"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import EmptyState from "@/components/EmptyState";

const ItemsPage = () => {
  const [item, setItem] = useState("");
  const [registeredItems, setRegisteredItems] = useState<string[]>([]);
  // flag para verificar se a leitura inicial do registeredItems no localStorage
  const [loaded, setLoaded] = useState(false);

  // Carregar do localStorage ao abrir a página
  useEffect(() => {
    try {
      const saved = localStorage.getItem("registeredItems");
      if (saved) setRegisteredItems(JSON.parse(saved));
      setLoaded(true);
    } catch (error) {
      console.error("Erro ao ler o localStorage", error);
    }
  }, []);

  // Salvar no localStorage sempre que registeredItems mudar
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("registeredItems", JSON.stringify(registeredItems));
    }
  }, [registeredItems, loaded]);

  const addItem = () => {
    if (!item.trim()) return;
    if (registeredItems.includes(item.trim())) {
      alert("Este item já foi cadastrado");
      return;
    }
    setRegisteredItems([...registeredItems, item.trim()]);
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
            onKeyDown={(e) => e.key === "Enter" && addItem()}
            placeholder="Ex: Pão, Shampoo..."
          />
          <Button className="cursor-pointer" onClick={addItem}>Adicionar</Button>
        </div>
      </div>
      <div className="p-5 mt-5 bg-white rounded-2xl border">
        <h2 className="text-2xl font-bold mb-5">Itens</h2>
        {registeredItems.length === 0 ? (
          <EmptyState description="Sem itens cadastrados" />
        ) : (
          <ul className="space-y-2">
            {registeredItems.map((name, index) => (
              <li key={index} className="flex items-center justify-between border p-2 rounded-md">
                <p className="ml-1">{name}</p>
                <Button variant="outline" className="cursor-pointer hover:bg-red-600 hover:text-white" onClick={() => setRegisteredItems(registeredItems.filter((_, idx) => idx !== index))}>
                  Remover
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ItemsPage;