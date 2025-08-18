/*
  Warnings:

  - The values [registrado] on the enum `ItemStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ItemStatus_new" AS ENUM ('disponível', 'sacola');
ALTER TABLE "public"."Item" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Item" ALTER COLUMN "status" TYPE "public"."ItemStatus_new" USING ("status"::text::"public"."ItemStatus_new");
ALTER TYPE "public"."ItemStatus" RENAME TO "ItemStatus_old";
ALTER TYPE "public"."ItemStatus_new" RENAME TO "ItemStatus";
DROP TYPE "public"."ItemStatus_old";
ALTER TABLE "public"."Item" ALTER COLUMN "status" SET DEFAULT 'disponível';
COMMIT;

-- AlterTable
ALTER TABLE "public"."Item" ADD COLUMN     "registered" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "public"."Item"("name");
