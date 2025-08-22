"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2Icon } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { toast } from "sonner";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Loading from "./loading";
import EmptyState from "@/components/EmptyState";
import EditItemDialog from "@/components/itens/EditItemDialog";

// import * as LucideIcons from "lucide-react";

interface Item {
  id: string,
  name: string,
  icon: string,
  price: string,
}

const formSchema = z.object({
  name: z.string(),
  icon: z.string(),
  price: z.string(),
});

const ItemsPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/itens");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Erro ao buscar itens", error);
      toast.error("Falha ao carregar a lista de itens.");
    } finally {
      setIsLoading(false);
    }
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

  const addItem = async (values: z.infer<typeof formSchema>) => {
    const { name, icon, price } = values;
    const nameFormatted = capitalizeFirstLetter(name);

    const response = await fetch("/api/itens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameFormatted,
        icon,
        price
      }),
    })

    const result = await response.json();

    if (!response.ok) {
      console.error("Erro ao criar item:", result.error);
      toast.warning("Item já existe");
      return;
    }

    fetchItems();
    toast.success(`Item ${name} adicionado`);
  }

  const removeItem = async ({ item }: { item: { id: string } }) => {
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

  const updateItem = async (item: { id: string, name: string, icon: string, price: string }) => {
    console.log(item);

    try {
      const response = await fetch(`/api/itens/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: item.name,
          icon: item.icon,
          price: item.price,
        }),
      })

      const result = await response.json();

      if (!response.ok) {
        console.error("Erro ao criar item:", result.error);
        toast.warning("Não foi possível atualizar o item");
        return;
      }

      fetchItems();
      toast.success(`Item ${item.name} atualizado`);
    } catch (error) {
      console.error("Erro ao deletar item.", error);
      toast.error("Erro ao deletar item");
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      icon: "",
      price: "",
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, icon, price } = values;

    const itemData = {
      name,
      icon,
      price
    }

    addItem(itemData);
  }

  return (
    <>
      <section className="p-5 bg-white rounded-2xl border max-w-[1040px] mx-auto">
        <h1 className="text-2xl font-bold mb-5">Novo item</h1>
        <div className="flex mb-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 w-full">
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ex: ShoppingBagIcon"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ex: Pão, Shampoo..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ex: 10,00"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div>
                <Button type="submit" className="cursor-pointer">
                  Adicionar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </section>

      <section className="p-5 mt-5 bg-white rounded-2xl border max-w-[1040px] mx-auto">
        <h2 className="text-2xl font-bold mb-5">Cadastrados ({sortedRegisteredList.length})</h2>
        {isLoading ? (
          <Loading />
        ) : sortedRegisteredList.length === 0 ? (
          <EmptyState description="Sem itens cadastrados" />
        ) : (
          <ul className="grid md:grid-cols-2 gap-2">
            {sortedRegisteredList.map((item, index) => {
              // const Icon = LucideIcons[item.icon as keyof typeof LucideIcons] as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

              return (
                <li key={index} className="flex items-center justify-between border p-2 rounded-md" >
                  <div className="flex gap-3 items-center ml-1">
                    {/* {Icon && <Icon className="w-[18px]" />} */}
                    <div>
                      <p>{item.name}</p>
                      <small className="text-gray-500">R$ {item.price}</small>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <EditItemDialog item={item} update={(values) => updateItem({ ...values, id: item.id })} />

                    <Button
                      variant="secondary" size="icon"
                      className="cursor-pointer hover:bg-red-600 hover:text-white"
                      onClick={() => removeItem({ item })}
                    >
                      <Trash2Icon />
                    </Button>
                  </div>
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