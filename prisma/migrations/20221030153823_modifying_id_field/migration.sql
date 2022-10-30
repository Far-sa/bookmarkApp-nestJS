/*
  Warnings:

  - You are about to drop the column `accessToken` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "accessToken",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "users_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");
