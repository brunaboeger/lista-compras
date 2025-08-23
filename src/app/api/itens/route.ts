import { NextRequest, NextResponse } from "next/server";
import { ItemStatus } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.item.findMany();
    return NextResponse.json(items);
  } catch (error) {
    console.error("Erro ao buscar itens.", error);
    return new NextResponse("Erro interno no servidor", { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, icon, price } = body;

  const existing = await prisma.item.findUnique({
    where: { name },
  });

  if (existing) {
    return NextResponse.json({ error: "Item já cadastrado" }, { status: 409 });
  }

  try {
    const newItem = await prisma.item.create({
      data: {
        name,
        icon,
        price,
        status: ItemStatus.DISPONIVEL,
      },
    });

    return NextResponse.json(newItem);
  } catch (error) {
    console.error("Erro ao criar item:", error);
    return NextResponse.json(
      { error: "Não foi possível criar o item" },
      { status: 500 }
    );
  }
}
