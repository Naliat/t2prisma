/*
  Warnings:

  - Added the required column `fisica` to the `Boletim` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingles` to the `Boletim` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quimica` to the `Boletim` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Boletim" ADD COLUMN     "fisica" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ingles" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quimica" DOUBLE PRECISION NOT NULL;
