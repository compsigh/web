/*
  Warnings:

  - The primary key for the `MarqueeEntry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `member` on the `MarqueeEntry` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `MarqueeEntry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `MarqueeEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `MarqueeEntry` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MarqueeEntry_member_key";

-- AlterTable
ALTER TABLE "MarqueeEntry" DROP CONSTRAINT "MarqueeEntry_pkey",
DROP COLUMN "member",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "nickname" TEXT NOT NULL,
ADD CONSTRAINT "MarqueeEntry_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "MarqueeEntry_id_key" ON "MarqueeEntry"("id");
