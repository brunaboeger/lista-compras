"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const NewItemForm = () => {
  const [item, setItem] = useState("");

  return (
    <div className="flex gap-2 mb-1">
      <Input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        onKeyDown={(e) => e.key === "Enter"}
        placeholder="Ex: Pão, Shampoo..."
      />
      <Button className="cursor-pointer">
        <PlusIcon />
        <p className="hidden md:block">Adicionar</p>
      </Button>
    </div>
  );
}

export default NewItemForm;