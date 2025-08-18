"use client";

import { Button } from "@/components/ui/button";
import { moveToBag, removeFromBag, getBagItems } from "@/lib/actions";
import { useEffect, useState } from "react";

import Link from "next/link";
import EmptyState from "@/components/EmptyState";
import * as LucideIcons from "lucide-react";

type Item = {
  id: number,
  name: string,
  icon: string,
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [bagItems, setBagItems] = useState<Item[]>([]);

  const fetchItems = async () => {
    const res = await fetch("/api/items");
    const data = await res.json();
    setItems(data);
  };

  const itemsFromBag = async () => {
    const data = await getBagItems();
    setBagItems(data);
  }

  const addToBag = async (id: number) => {
    await moveToBag(id);
    fetchItems();
    itemsFromBag();
  };

  const removeItemFromBag = async (id: number) => {
    await removeFromBag(id);
    itemsFromBag();
    fetchItems();
  }

  useEffect(() => {
    fetchItems();
    itemsFromBag();
  }, []);

  const sortedRegisteredList = [...items].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="p-5 space-y-5">
      {/* Sacola */}
      <section className="flex flex-col max-w-[1040px] mx-auto gap-4 p-5 bg-white rounded-2xl border">
        <h1 className="text-2xl font-extrabold">Sacola</h1>
        {/* <BagItems /> */}
        <div>
          {bagItems.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {bagItems.map((item) => {
                const Icon = LucideIcons[item.icon as keyof typeof LucideIcons] as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
                return (
                  <Button
                    variant="outline"
                    key={item.id}
                    className="flex flex-col p-4 gap-1 h-auto cursor-pointer"
                    onClick={() => removeItemFromBag(item.id)}
                  >
                    {Icon && <Icon />}
                    <p className="mt-1 font-medium">{item.name}</p>
                  </Button>
                )
              })}
            </div>
          ) : (
            <EmptyState description="Sacola vazia" />
          )}
        </div>
      </section>

      {/* Disponíveis */}
      <section className="flex flex-col max-w-[1040px] mx-auto gap-4 p-5 bg-white rounded-2xl border">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold">Disponíveis</h2>
          <Button asChild>
            <Link href="/itens">
              Novo item
            </Link>
          </Button>
        </div>
        <div>
          {sortedRegisteredList?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {sortedRegisteredList.map((item) => {
                const Icon = LucideIcons[item.icon as keyof typeof LucideIcons] as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
                return (
                  <Button
                    variant="outline"
                    key={item.id}
                    className="flex flex-col p-4 gap-1 h-auto cursor-pointer"
                    onClick={() => addToBag(item.id)}
                  >
                    {Icon && <Icon />}
                    <p className="mt-1 font-medium">{item.name}</p>
                  </Button>
                )
              })}
            </div>
          ) : (
            <EmptyState description="Sem itens disponíveis" />
          )}
        </div>
      </section>
    </div>
  );
}
