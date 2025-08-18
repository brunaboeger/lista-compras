import { NextResponse } from "next/server";
import { ItemStatus } from "@/generated/prisma";
import prisma from "@/lib/prisma";

export async function GET() {
  const items = await prisma.item.findMany({
    where: { status: ItemStatus.SACOLA },
  });
  return NextResponse.json(items);
}
