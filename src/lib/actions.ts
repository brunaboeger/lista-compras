"use server";

import prisma from "@/lib/prisma";

export const getItems = async () => {
  const items = await prisma.item.findMany();
  return items;
};

export const createItem = async (data: { name: string; icon: string }) => {
  try {
    const newItem = await prisma.item.create({
      data: {
        ...data,
        status: "disponível",
      },
    });

    return newItem;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Não foi possível criar o item.");
  }
};

export const deleteItem = async (itemId: number) => {
  try {
    const deleted = await prisma.item.delete({
      where: { id: itemId },
    });

    return deleted;
  } catch (error) {
    console.error("Erro ao deletar item:", error);
    throw new Error("Não foi possível deletar o item.");
  }
};

export const getAvailableItems = async () => {
  return await prisma.item.findMany({
    where: { status: "disponível" },
  });
};

export const getBagItems = async () => {
  const bagItems = await prisma.item.findMany({
    where: { status: "sacola" },
  });

  return bagItems;
};

export const moveToBag = async (itemId: number) => {
  return await prisma.item.update({
    where: { id: itemId },
    data: { status: "sacola" },
  });
};

export const removeFromBag = async (itemId: number) => {
  try {
    const item = await prisma.item.update({
      where: { id: itemId },
      data: { status: "disponível" },
    });

    return item;
  } catch (error) {
    console.error("Erro ao deletar item:", error);
    throw new Error("Não foi possível deletar o item da sacola.");
  }
};
