"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2Icon } from "lucide-react";

import EmptyState from "@/components/EmptyState";
// import * as LucideIcons from "lucide-react";

type Item = {
  id: number,
  name: string,
  icon: string,
}

const ItemsPage = () => {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = async () => {
    const response = await fetch("/api/itens");
    const data = await response.json();
    setItems(data);
  };

  const sortedRegisteredList = [...items].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  useEffect(() => {
    fetchItems();
  }, []);

  const capitalizeFirstLetter = (name: string) => {
    if (typeof name !== "string" || name.length === 0) {
      return name;
    }

    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const addNewItem = async (data: { name: string, icon: string }) => {
    const { name, icon } = data;
    const nameFormatted = capitalizeFirstLetter(name);

    const response = await fetch("/api/itens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameFormatted,
        icon
      }),
    })

    const result = await response.json();

    if (!response.ok) {
      console.error("Erro ao criar item:", result.error);
      toast.warning("Item já existe");
      return;
    }

    fetchItems();
    setNewItem("");
    toast.success(`Item ${data.name} adicionado`);
  }

  const removeItem = async ({ item }: { item: { id: number } }) => {
    try {
      const response = await fetch(`/api/itens/${item.id}`, { method: "DELETE" });

      const result = await response.json();

      if (response.ok) {
        fetchItems();
        toast.success(result.message);
      } else {
        console.error("Erro ao deletar item.", result.error);
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <section className="p-5 bg-white rounded-2xl border max-w-[1040px] mx-auto">
        <h1 className="text-2xl font-bold mb-5">Novo item</h1>
        <div className="flex gap-2 mb-1">
          <Input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addNewItem({ name: newItem, icon: "" })}
            placeholder="Ex: Pão, Shampoo..."
          />
          <Button onClick={() => addNewItem({ name: newItem, icon: "" })} className="cursor-pointer">
            <p>Adicionar</p>
          </Button>
        </div>
      </section>

      <section className="p-5 mt-5 bg-white rounded-2xl border max-w-[1040px] mx-auto">
        <h2 className="text-2xl font-bold mb-5">Cadastrados ({sortedRegisteredList.length})</h2>
        {sortedRegisteredList.length === 0 ? (
          <EmptyState description="Sem itens cadastrados" />
        ) : (
          <ul className="grid md:grid-cols-2 gap-2">
            {sortedRegisteredList.map((item, index) => {
              // const Icon = LucideIcons[item.icon as keyof typeof LucideIcons] as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

              return (
                <li key={index} className="flex items-center justify-between border p-2 rounded-md" >
                  <div className="flex gap-3 items-center ml-1">
                    {/* {Icon && <Icon className="w-[18px]" />} */}
                    <p>{item.name}</p>
                  </div>
                  <Button
                    variant="secondary" size="icon"
                    className="cursor-pointer hover:bg-red-600 hover:text-white"
                    onClick={() => removeItem({ item })}
                  >
                    <Trash2Icon />
                  </Button>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </ >
  );
}

export default ItemsPage;