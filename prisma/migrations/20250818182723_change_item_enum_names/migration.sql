/*
  Warnings:

  - The values [disponível,sacola] on the enum `ItemStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ItemStatus_new" AS ENUM ('DISPONIVEL', 'SACOLA');
ALTER TABLE "public"."Item" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Item" ALTER COLUMN "status" TYPE "public"."ItemStatus_new" USING ("status"::text::"public"."ItemStatus_new");
ALTER TYPE "public"."ItemStatus" RENAME TO "ItemStatus_old";
ALTER TYPE "public"."ItemStatus_new" RENAME TO "ItemStatus";
DROP TYPE "public"."ItemStatus_old";
ALTER TABLE "public"."Item" ALTER COLUMN "status" SET DEFAULT 'DISPONIVEL';
COMMIT;

-- AlterTable
ALTER TABLE "public"."Item" ALTER COLUMN "status" SET DEFAULT 'DISPONIVEL';
