/*
  Warnings:

  - You are about to drop the column `password_hash` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_sessions" ALTER COLUMN "expire_at" SET DEFAULT now() + interval '24 hours';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "password_hash",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "users_id_seq";
