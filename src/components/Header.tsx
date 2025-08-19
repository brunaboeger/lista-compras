export default function Header() {
  const username = "Olá!";

  return (
    <header className="p-5 border-b shadow bg-gray-950 text-white sticky top-0">
      <div className="flex items-center justify-between max-w-[1040px] mx-auto">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center border rounded-full w-[40px] h-[40px] bg-white text-gray-950">
            {username.charAt(0)}
          </div>
          <h3 className="font-medium">{username}</h3>
        </div>
      </div>
    </header>
  )
}