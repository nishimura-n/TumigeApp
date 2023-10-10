/*
  Warnings:

  - Added the required column `fav` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Favorite" ADD COLUMN     "fav" BOOLEAN NOT NULL,
ADD COLUMN     "note" TEXT NOT NULL,
ADD COLUMN     "tag" TEXT NOT NULL;
