/*
  Warnings:

  - You are about to drop the `Favorite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- DropTable
DROP TABLE "Favorite";

-- CreateTable
CREATE TABLE "Tumige" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "note" TEXT,
    "tag" TEXT,
    "rank" INTEGER DEFAULT 5,
    "isBuy" BOOLEAN DEFAULT false,
    "fileName" TEXT,

    CONSTRAINT "Tumige_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tumige" ADD CONSTRAINT "Tumige_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
