import { getItems } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import NewItemForm from "@/components/itens/NewItemForm";
import EmptyState from "@/components/EmptyState";
import * as LucideIcons from "lucide-react";

const ItemsPage = async () => {
  const registeredItems = await getItems();
  const sortedRegisteredList = [...registeredItems].sort((a, b) =>
    a.name.localeCompare(b.name)
  );


  return (
    <div className="p-5">
      <section className="p-5 bg-white rounded-2xl border max-w-[1040px] mx-auto">
        <h1 className="text-2xl font-bold mb-5">Novo item</h1>
        <NewItemForm />
      </section>

      <section className="p-5 mt-5 bg-white rounded-2xl border max-w-[1040px] mx-auto">
        <h2 className="text-2xl font-bold mb-5">Cadastrados ({registeredItems.length})</h2>
        {registeredItems.length === 0 ? (
          <EmptyState description="Sem itens cadastrados" />
        ) : (
          <ul className="grid grid-cols-2 gap-2">
            {sortedRegisteredList.map((item, index) => {
              const Icon = LucideIcons[item.icon as keyof typeof LucideIcons] as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

              return (
                <li key={index} className="flex items-center justify-between border p-2 rounded-md" >
                  <div className="flex gap-3 items-center">
                    {Icon && <Icon className="w-[18px] ml-1" />}
                    <p>{item.name}</p>
                  </div>
                  <Button variant="outline" className="cursor-pointer hover:bg-red-600 hover:text-white">
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