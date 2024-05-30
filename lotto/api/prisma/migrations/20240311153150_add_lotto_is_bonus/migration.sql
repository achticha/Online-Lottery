-- AlterTable
ALTER TABLE "BillSaleDatailIsBonus" ADD COLUMN     "bonusResultDetailId" INTEGER;

-- CreateTable
CREATE TABLE "LottoIsBonus" (
    "id" SERIAL NOT NULL,
    "bonusResultDetailId" INTEGER NOT NULL,

    CONSTRAINT "LottoIsBonus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BillSaleDatailIsBonus" ADD CONSTRAINT "BillSaleDatailIsBonus_bonusResultDetailId_fkey" FOREIGN KEY ("bonusResultDetailId") REFERENCES "BonusResultDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LottoIsBonus" ADD CONSTRAINT "LottoIsBonus_bonusResultDetailId_fkey" FOREIGN KEY ("bonusResultDetailId") REFERENCES "BonusResultDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
