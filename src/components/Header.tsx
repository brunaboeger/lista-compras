import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-5 border-b shadow bg-gray-950 text-white sticky top-0">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center border rounded-full w-[40px] h-[40px] bg-white text-gray-950">
          C
        </div>
        <h3 className="font-medium">Olá, Caitlyn</h3>
      </div>
      <div>
        <Button variant="secondary" asChild>
          <Link href="/">Início</Link>
        </Button>
      </div>
    </header>
  )
}