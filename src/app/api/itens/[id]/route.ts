import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { name, icon, status } = body;

  try {
    const { id } = await params;
    const updatedItem = await prisma.item.update({
      where: { id },
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const deletedItem = await prisma.item.deleteMany({
      where: { id },
    });

    if (deletedItem.count === 0) {
      return NextResponse.json(
        { message: "Item não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Item deletado com sucesso",
      deletedItem,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Não foi possível deletar o item", error },
      { status: 400 }
    );
  }
}
