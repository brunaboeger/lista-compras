export default function Header() {
  return (
    <header className="p-5 border-b shadow bg-gray-950 text-white sticky top-0">
      <div className="flex items-center justify-between max-w-[1040px] mx-auto">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center border rounded-full w-[40px] h-[40px] bg-white text-gray-950">
            O
          </div>
          <h3 className="font-medium">Olá!</h3>
        </div>
      </div>
    </header>
  )
}