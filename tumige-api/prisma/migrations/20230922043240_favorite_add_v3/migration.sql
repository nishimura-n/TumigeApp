/*
  Warnings:

  - The `fav` column on the `Favorite` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "fav",
ADD COLUMN     "fav" INTEGER NOT NULL DEFAULT 0;
