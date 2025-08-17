"use client";

import { getItems, createItem, deleteItem } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import EmptyState from "@/components/EmptyState";
import * as LucideIcons from "lucide-react";

type Item = {
  id: number,
  name: string,
  icon: string,
}

const ItemsPage = () => {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  const registeredItems = async () => {
    const data = await getItems();
    setItems(data);
  };

  const sortedRegisteredList = [...items].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  useEffect(() => {
    registeredItems();
  }, []);

  const addNewItem = async (item: string) => {
    const alreadyExists = items.some(existing => existing.name === item);

    if (!alreadyExists) {
      await createItem({ name: item.trim(), icon: "" });
      registeredItems();
      setNewItem("");
      toast.success("Item adicionado");
    } else {
      toast.warning("Item já existe");
    }
  }

  const removeItem = async (itemId: number) => {
    await deleteItem(itemId);
    registeredItems();
    toast.success("Item removido");
  }

  return (
    <div className="p-5">
      <section className="p-5 bg-white rounded-2xl border max-w-[1040px] mx-auto">
        <h1 className="text-2xl font-bold mb-5">Novo item</h1>
        <div className="flex gap-2 mb-1">
          <Input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addNewItem(newItem)}
            placeholder="Ex: Pão, Shampoo..."
          />
          <Button className="cursor-pointer">
            <PlusIcon />
            <p className="hidden md:block">Adicionar</p>
          </Button>
        </div>
        {/* <NewItemForm /> */}
      </section>

      <section className="p-5 mt-5 bg-white rounded-2xl border max-w-[1040px] mx-auto">
        <h2 className="text-2xl font-bold mb-5">Cadastrados ({sortedRegisteredList.length})</h2>
        {sortedRegisteredList.length === 0 ? (
          <EmptyState description="Sem itens cadastrados" />
        ) : (
          <ul className="grid grid-cols-2 gap-2">
            {sortedRegisteredList.map((item, index) => {
              const Icon = LucideIcons[item.icon as keyof typeof LucideIcons] as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

              return (
                <li key={index} className="flex items-center justify-between border p-2 rounded-md" >
                  <div className="flex gap-3 items-center ml-1">
                    {Icon && <Icon className="w-[18px]" />}
                    <p>{item.name}</p>
                  </div>
                  <Button
                    variant="outline"
                    className="cursor-pointer hover:bg-red-600 hover:text-white"
                    onClick={() => removeItem(item.id)}
                  >
                    Remover
                  </Button>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div >
  );
}

export default ItemsPage;