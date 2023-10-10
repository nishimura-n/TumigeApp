/*
  Warnings:

  - The `rank` column on the `Favorite` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fav` column on the `Favorite` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "rank",
ADD COLUMN     "rank" INTEGER DEFAULT 5,
ALTER COLUMN "note" DROP NOT NULL,
ALTER COLUMN "tag" DROP NOT NULL,
DROP COLUMN "fav",
ADD COLUMN     "fav" BOOLEAN DEFAULT false;
