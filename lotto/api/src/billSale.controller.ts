import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Headers,
} from '@nestjs/common';
import { PrismaClient, BillSale } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('/api/billSale')
export class BillSaleController {
  @Post('transferMoney')
  async transferMoney(
    @Body('billSaleId') billSaleId: number,
    @Body('transferMoneyTime') transferMoneyTime: string,
    @Body('transferMoneyDate') transferMoneyDate: string,
    @Body('price') price: number,
  ) {
    try {
      const res = await prisma.billSale.update({
        data: {
          transferMoneyTime: transferMoneyTime,
          transferMoneyDate: transferMoneyDate,
          price: price,
        },
        where: {
          id: billSaleId,
        },
      });
      if (res.id != undefined) {
        return { message: 'success' };
      }
      return { result: res };
    } catch (e) {
      return { message: e };
    }
  }

  @Post('deliverMoney')
  async deliverMoney(
    @Body('billSaleId') billSaleId: number,
    @Body('deliverDate') deliverDate: string,
    @Body('price') price: number,
  ) {
    try {
      const res = await prisma.billSale.update({
        data: {
          deliverDate: deliverDate,
          price: price,
        },
        where: {
          id: billSaleId,
        },
      });
      if (res.id != undefined) {
        return { message: 'success' };
      }
      return { result: res };
    } catch (e) {
      return { message: e };
    }
  }

  @Post('income')
  async income(
    @Body('fromDate') fromDate: string,
    @Body('toDate') toDate: string,
  ) {
    try {
      const res = await prisma.billSaleDatail.findMany({
        where: {
          billSale: {
            payDate: {
              not: null,
              gte: new Date(fromDate),
              lte: new Date(toDate),
            },
          },
        },
        include: {
          lotto: true,
          billSale: true,
        },
      });
      return { results: res };
    } catch (e) {
      return { message: e };
    }
  }

  @Post('profit')
  async profit(
    @Body('fromDate') fromData: string,
    @Body('toDate') toDate: string,
  ) {
    try {
      const fromDateValue = new Date(fromData).toISOString();
      const toDateValue = new Date(toDate).toISOString();
      //รายได้จากการขายและรายจ่าย
      const billSaleDatails = await prisma.billSaleDatail.findMany({
        where: {
          billSale: {
            payDate: {
              not: null,
              gte: new Date(fromData),
              lte: new Date(toDate),
            },
          },
        },
        include: {
          lotto: true,
          billSale: true,
        },
      });
      //รายได้จากการถูกรางวัล
      const lottoIsBonus = await prisma.lottoIsBonus.findMany({
        where: {
          BonusResultDetail: {
            bonusDate: {
              gte: fromDateValue,
              lte: toDateValue,
            },
          },
        },
        include: {
          BonusResultDetail: true,
        },
      });
      const lottos = await prisma.lotto.findMany({
        where: {
          lottoDate: {
            gte: fromDateValue,
            lte: toDateValue,
          },
        },
      });
      return { billSaleDatails: billSaleDatails, lottoIsBonus: lottoIsBonus, lottos: lottos };
    } catch (e) {
      return { message: e };
    }
  }
}
