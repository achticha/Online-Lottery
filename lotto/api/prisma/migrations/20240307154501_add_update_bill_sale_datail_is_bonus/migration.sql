/*
  Warnings:

  - You are about to drop the column `cost` on the `BillSaleDatailIsBonus` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `BillSaleDatailIsBonus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BillSaleDatailIsBonus" DROP COLUMN "cost",
DROP COLUMN "price";
