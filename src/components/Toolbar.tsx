import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"

const Toolbar = () => {
  return (
    <footer className="flex gap-2 p-5 absolute w-full bottom-0 border-t bg-white shadow-2xl">
      <Input placeholder="Item..." />
      <Button>Criar</Button>
    </footer>
  );
}

export default Toolbar;