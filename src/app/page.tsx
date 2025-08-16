"use client";

import { PlusIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/EmptyState";
import Link from "next/link";
import ItemsGridList from "@/components/ItemsGridList";

export default function Home() {
  const [bagItems, setBagItems] = useState<string[]>([]);
  const [registeredItems, setRegisteredItems] = useState<string[]>([]);

  // Carrega os dados do localStorage ao iniciar
  useEffect(() => {
    try {
      const getRegistered = localStorage.getItem("registeredItems");
      const getBag = localStorage.getItem("bagItens");

      const parsedRegistered = getRegistered ? JSON.parse(getRegistered) : [];
      const parsedBag = getBag ? JSON.parse(getBag) : [];

      setRegisteredItems(parsedRegistered);
      setBagItems(parsedBag);
    } catch (error) {
      console.error("Erro ao carregar dados do localStorage:", error);
    }
  }, []);

  // Calcula os itens disponíveis dinamicamente
  const availableItems = registeredItems.filter(
    item => !bagItems.includes(item)
  );

  // Adiciona item à sacola
  const addItemToBag = (name: string) => {
    if (!bagItems.includes(name)) {
      const updatedBag = [...bagItems, name];
      setBagItems(updatedBag);
      localStorage.setItem("bagItens", JSON.stringify(updatedBag));
    }
  };

  // Remove item da sacola
  const removeItemFromBag = (name: string) => {
    if (bagItems.includes(name)) {
      const updatedBag = bagItems.filter(item => item !== name);
      setBagItems(updatedBag);
      localStorage.setItem("bagItens", JSON.stringify(updatedBag));
    }
  };

  return (
    <div className="p-5 space-y-5">
      {/* Sacola */}
      <section className="flex flex-col gap-4 p-5 bg-white rounded-2xl border">
        <h1 className="text-2xl font-extrabold">Sacola</h1>
        {bagItems.length > 0 ? (
          <ItemsGridList list={bagItems} action={(name) => removeItemFromBag(name)} />
        ) : (
          <EmptyState description="Sacola vazia" />
        )}
      </section>

      {/* Disponíveis */}
      <section className="flex flex-col gap-4 p-5 bg-white rounded-2xl border">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold">Disponíveis</h2>
          <Button asChild>
            <Link href="/itens">
              <PlusIcon />
              Novo item
            </Link>
          </Button>
        </div>
        {availableItems.length > 0 ? (
          <ItemsGridList list={availableItems} action={(name) => addItemToBag(name)} />
        ) : (
          <EmptyState description="Sem itens disponíveis" />
        )}
      </section>
    </div>
  );
}
