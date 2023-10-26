/*
  Warnings:

  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email,username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `passwordHash` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "created_at",
DROP COLUMN "first_name",
DROP COLUMN "last_name",
DROP COLUMN "password_hash",
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firstName" VARCHAR(50),
ADD COLUMN     "lastName" VARCHAR(50),
ADD COLUMN     "passwordHash" VARCHAR(60) NOT NULL,
ALTER COLUMN "username" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_username_key" ON "users"("email", "username");
