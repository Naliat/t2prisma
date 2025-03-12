/*
  Warnings:

  - You are about to drop the column `fisica` on the `Boletim` table. All the data in the column will be lost.
  - You are about to drop the column `ingles` on the `Boletim` table. All the data in the column will be lost.
  - You are about to drop the column `quimica` on the `Boletim` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Boletim" DROP COLUMN "fisica",
DROP COLUMN "ingles",
DROP COLUMN "quimica",
ALTER COLUMN "portugues" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "matematica" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "ciencias" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "historia" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "geografia" SET DATA TYPE DOUBLE PRECISION;
