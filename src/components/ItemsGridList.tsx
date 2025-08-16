import { Button } from "@/components/ui/button";
// import { SoapDispenserDropletIcon } from "lucide-react";

type ItemsGridListProps = {
  list: string[];
  action: (name: string) => void;
}

const ItemsGridList = ({ list, action }: ItemsGridListProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {list.map((name, index) => (
        <Button
          onClick={() => action(name)}
          variant="outline"
          key={index}
          className="flex flex-col p-4 gap-1 h-auto cursor-pointer"
        >
          {/* <SoapDispenserDropletIcon /> */}
          <p className="mt-1 font-medium">{name}</p>
        </Button>
      ))}
    </div>
  );
}

export default ItemsGridList;