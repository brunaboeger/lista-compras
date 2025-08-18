import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { id: number } }
) {
  const body = await request.json();
  const { name, icon, status } = body;

  try {
    const updatedItem = await prisma.item.update({
      where: { id: params.id },
      data: { name, icon, status },
    });
    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Item não encontrado ou erro ao atualizar.",
        error,
      },
      { status: 400 }
    );
  }
}
