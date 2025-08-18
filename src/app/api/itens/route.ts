import { NextResponse } from "next/server";
import { ItemStatus } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function GET() {
  const items = await prisma.item.findMany();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, icon } = body;

  // Verifica se existe um item com o mesmo nome
  const existing = await prisma.item.findUnique({
    where: { name },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Item com esse nome já existe." },
      { status: 409 }
    );
  }

  try {
    const newItem = await prisma.item.create({
      data: {
        name: name,
        icon: icon,
        status: ItemStatus.DISPONIVEL,
      },
    });

    return NextResponse.json(newItem);
  } catch (error) {
    console.error("Erro ao criar item:", error);
    return NextResponse.json({ error: "Erro ao criar item" }, { status: 500 });
  }
}
