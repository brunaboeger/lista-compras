import prisma from "@/lib/prisma";

export const getItems = async () => {
  const items = await prisma.item.findMany();
  return items;
};
