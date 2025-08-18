import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const items = await prisma.item.findMany({
    where: { status: "sacola" },
  });
  return NextResponse.json(items);
}
