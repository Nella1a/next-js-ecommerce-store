-- AlterTable
ALTER TABLE "base"."user_sessions" ALTER COLUMN "expire_at" SET DEFAULT now() + interval '24 hours';

-- CreateTable
CREATE TABLE "hotdeals"."categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotdeals"."products" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "current_price" INTEGER NOT NULL,
    "old_price" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL,
    "product_url" VARCHAR(255) NOT NULL,
    "img_url" VARCHAR(255),
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shop_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "uvp" BOOLEAN NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotdeals"."shops" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "shops_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "hotdeals"."products" ADD CONSTRAINT "products_categories_id_fkey" FOREIGN KEY ("category_id") REFERENCES "hotdeals"."categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hotdeals"."products" ADD CONSTRAINT "products_shops_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "hotdeals"."shops"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
