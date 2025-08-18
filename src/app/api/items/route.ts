import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const items = await prisma.item.findMany({
    where: { status: "disponível" },
  });

  return NextResponse.json(items);
}
