/*
  Warnings:

  - You are about to drop the `Bag` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."ItemStatus" AS ENUM ('registrado', 'disponível', 'sacola');

-- AlterTable
ALTER TABLE "public"."Item" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "public"."ItemStatus" NOT NULL DEFAULT 'registrado';

-- DropTable
DROP TABLE "public"."Bag";
