/*
  Warnings:

  - You are about to drop the `_ProductToProductCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "base"."_ProductToProductCategory" DROP CONSTRAINT "_ProductToProductCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "base"."_ProductToProductCategory" DROP CONSTRAINT "_ProductToProductCategory_B_fkey";

-- AlterTable
ALTER TABLE "base"."user_sessions" ALTER COLUMN "expire_at" SET DEFAULT now() + interval '24 hours';

-- DropTable
DROP TABLE "base"."_ProductToProductCategory";

-- CreateTable
CREATE TABLE "base"."_PlantProductToProductCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlantProductToProductCategory_AB_unique" ON "base"."_PlantProductToProductCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_PlantProductToProductCategory_B_index" ON "base"."_PlantProductToProductCategory"("B");

-- AddForeignKey
ALTER TABLE "base"."_PlantProductToProductCategory" ADD CONSTRAINT "_PlantProductToProductCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "base"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."_PlantProductToProductCategory" ADD CONSTRAINT "_PlantProductToProductCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "base"."product_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
