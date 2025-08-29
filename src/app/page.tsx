"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { convertToReal, formatPrice } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import EmptyState from "@/components/EmptyState";
import Loading from "./loading";

type Item = {
  id: number,
  name: string,
  icon: string,
  price: string,
}

export default function Home() {
  const { data: session } = useSession();

  if (!session) redirect("/entrar");

  const [items, setItems] = useState<Item[]>([]);
  const [bagItems, setBagItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAvailableItems = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/available");
      const data = await response.json();

      if (!response.ok) throw new Error(`Erro ${response.status}`);
      else setItems(data);
    } catch (error) {
      console.error("Não foi possível encontrar os itens disponíveis.", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBagItems = async () => {
    try {
      const response = await fetch("/api/bag");
      const data = await response.json();
      setBagItems(data);
    } catch (error) {
      console.error("Não foi possível encontrar os itens na sacola.", error);
    }
  }

  const handleItemStatus = async ({ item }: { item: { id: number } }, itemStatus: string) => {
    try {
      const response = await fetch(`/api/itens/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: itemStatus }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar status do item");
      }

      fetchAvailableItems();
      fetchBagItems();
      const result = await response.json();
      return result;

    } catch (error) {
      console.error(error);
    }
  };

  const sortedRegisteredList = [...items].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const totalPriceOfItems = bagItems.reduce((acc, item) => {
    return acc + (formatPrice(item.price) || 0);
  }, 0);

  useEffect(() => {
    fetchAvailableItems();
    fetchBagItems();
  }, []);

  return (
    <>
      {/* Sacola */}
      <section className="flex flex-col max-w-[1040px] mx-auto gap-4 p-5 bg-white rounded-2xl border">
        <div className="flex justify-between items-end">
          <h1 className="text-2xl font-extrabold">Sacola ({bagItems.length})</h1>
          <p>{convertToReal(totalPriceOfItems)}</p>
        </div>
        <div>
          {isLoading ? (
            <Loading length={3} />
          ) : bagItems.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {bagItems.map((item) => {
                return (
                  <Button
                    variant="outline"
                    key={item.id}
                    className="flex flex-col p-4 gap-1 h-auto cursor-pointer"
                    onClick={() => handleItemStatus({ item }, "DISPONIVEL")}
                  >
                    <p className="mt-1 font-medium">{item.name}</p>
                    <small className="mt-1 text-gray-500">{convertToReal(item.price)}</small>
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
        </div>
        <div>
          {isLoading ? (
            <Loading length={30} />
          ) : sortedRegisteredList?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {sortedRegisteredList.map((item) => {
                return (
                  <Button
                    variant="outline"
                    key={item.id}
                    className="flex flex-col p-4 gap-1 h-auto cursor-pointer"
                    onClick={() => handleItemStatus({ item }, "SACOLA")}
                  >
                    <p className="mt-1 font-medium">{item.name}</p>
                    <small className="mt-1 text-gray-500">{convertToReal(item.price)}</small>
                  </Button>
                )
              })}
            </div>
          ) : (
            <EmptyState description="Sem itens disponíveis" />
          )}
        </div>
      </section>
    </>
  );
}
