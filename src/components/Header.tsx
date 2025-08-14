import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center gap-2 p-5 border-b shadow bg-white sticky top-0">
      <Link href="/">
        <div className="flex items-center justify-center border rounded-full w-[40px] h-[40px] bg-gray-950 text-white">
          C
        </div>
      </Link>
      <h3 className="font-medium">Olá, Caitlyn</h3>
    </header>
  )
}