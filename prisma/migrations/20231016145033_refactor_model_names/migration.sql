/*
  Warnings:

  - You are about to drop the `carts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_session_id_fkey";

-- DropForeignKey
ALTER TABLE "carts_and_items" DROP CONSTRAINT "carts_and_items_cart_id_fkey";

-- DropTable
DROP TABLE "carts";

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "session_id" INTEGER,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "user_sessions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "carts_and_items" ADD CONSTRAINT "carts_and_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "Cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
