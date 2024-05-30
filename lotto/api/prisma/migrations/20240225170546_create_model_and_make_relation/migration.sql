-- CreateTable
CREATE TABLE "BillSale" (
    "id" SERIAL NOT NULL,
    "payDate" TIMESTAMP(3),
    "createdDate" TIMESTAMP(3) NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerAddress" TEXT,

    CONSTRAINT "BillSale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillSaleDatail" (
    "id" SERIAL NOT NULL,
    "billSaleId" INTEGER NOT NULL,
    "lottoId" INTEGER NOT NULL,

    CONSTRAINT "BillSaleDatail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BillSaleDatail" ADD CONSTRAINT "BillSaleDatail_billSaleId_fkey" FOREIGN KEY ("billSaleId") REFERENCES "BillSale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillSaleDatail" ADD CONSTRAINT "BillSaleDatail_lottoId_fkey" FOREIGN KEY ("lottoId") REFERENCES "Lotto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
