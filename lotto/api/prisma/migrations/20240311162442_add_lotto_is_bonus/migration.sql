/*
  Warnings:

  - Made the column `bonusResultDetailId` on table `BillSaleDatailIsBonus` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "BillSaleDatailIsBonus" DROP CONSTRAINT "BillSaleDatailIsBonus_bonusResultDetailId_fkey";

-- AlterTable
ALTER TABLE "BillSaleDatailIsBonus" ALTER COLUMN "bonusResultDetailId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "BillSaleDatailIsBonus" ADD CONSTRAINT "BillSaleDatailIsBonus_bonusResultDetailId_fkey" FOREIGN KEY ("bonusResultDetailId") REFERENCES "BonusResultDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
