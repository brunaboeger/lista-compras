import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-5 border-b shadow bg-white sticky top-0">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center border rounded-full w-[40px] h-[40px] bg-gray-950 text-white">
          C
        </div>
        <h3 className="font-medium">Olá, Caitlyn</h3>
      </div>
      <div>
        <Button variant="outline" asChild>
          <Link href="/">Início</Link>
        </Button>
      </div>
    </header>
  )
}