-- DropIndex
DROP INDEX "user_sessions_user_id_key";

-- AlterTable
ALTER TABLE "user_sessions" ALTER COLUMN "expire_at" SET DEFAULT now() + interval '24 hours';
