/*
  Warnings:

  - You are about to drop the column `bonusData` on the `BonusResultDetail` table. All the data in the column will be lost.
  - Added the required column `bonusDate` to the `BonusResultDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BonusResultDetail" DROP COLUMN "bonusData",
ADD COLUMN     "bonusDate" TIMESTAMP(3) NOT NULL;
