import { NextResponse } from "next/server";
import { ItemStatus } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const availableItems = await prisma.item.findMany({
      where: { status: ItemStatus.DISPONIVEL },
    });
    return NextResponse.json(availableItems);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao buscar os itens disponíveis." },
      { status: 500 }
    );
  }
}
