/*
  Warnings:

  - You are about to alter the column `portugues` on the `Boletim` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `matematica` on the `Boletim` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `ciencias` on the `Boletim` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `historia` on the `Boletim` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `geografia` on the `Boletim` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `fisica` on the `Boletim` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `ingles` on the `Boletim` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `quimica` on the `Boletim` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Boletim" ALTER COLUMN "portugues" SET DATA TYPE INTEGER,
ALTER COLUMN "matematica" SET DATA TYPE INTEGER,
ALTER COLUMN "ciencias" SET DATA TYPE INTEGER,
ALTER COLUMN "historia" SET DATA TYPE INTEGER,
ALTER COLUMN "geografia" SET DATA TYPE INTEGER,
ALTER COLUMN "fisica" SET DATA TYPE INTEGER,
ALTER COLUMN "ingles" SET DATA TYPE INTEGER,
ALTER COLUMN "quimica" SET DATA TYPE INTEGER;
