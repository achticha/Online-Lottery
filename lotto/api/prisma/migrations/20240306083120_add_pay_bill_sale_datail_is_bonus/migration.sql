/*
  Warnings:

  - You are about to drop the column `price` on the `BillSaleDatail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BillSale" ADD COLUMN     "deliverDate" TIMESTAMP(3),
ADD COLUMN     "price" INTEGER,
ADD COLUMN     "transferMoneyDate" TIMESTAMP(3),
ADD COLUMN     "transferMoneyTime" TEXT;

-- AlterTable
ALTER TABLE "BillSaleDatail" DROP COLUMN "price";

-- CreateTable
CREATE TABLE "BillSaleDatailIsBonus" (
    "id" SERIAL NOT NULL,
    "billSaleDetailId" INTEGER NOT NULL,
    "bonusPrice" INTEGER NOT NULL,
    "bonusDate" TIMESTAMP(3) NOT NULL,
    "number" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "BillSaleDatailIsBonus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BillSaleDatailIsBonus" ADD CONSTRAINT "BillSaleDatailIsBonus_billSaleDetailId_fkey" FOREIGN KEY ("billSaleDetailId") REFERENCES "BillSaleDatail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
