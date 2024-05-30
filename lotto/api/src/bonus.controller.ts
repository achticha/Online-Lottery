import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UnauthorizedException,
  Headers,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
@Controller('/api/bonus')
export class BonusController {
  @Post('/getBonus')
  async getBonus() {
    try {
      const res = await axios.post(
        'https://www.glo.or.th/api/lottery/getLatestLottery',
      );
      const data = res.data.response.data;
      const date = new Date(res.data.response.date);
      const first = data.first;
      const second = data.second;
      const third = data.third;
      const fourth = data.fourth;
      const fifth = data.fifth;
      const last2 = data.last2;
      const last3f = data.last3f;
      const last3b = data.last3b;
      const near1 = data.near1;

      const row = await prisma.bonusResultDetail.findMany({
        where: {
          bonusDate: date,
        },
      });

      if (row.length == 0) {
        for (let i = 0; i < first.number.length; i++) {
          await prisma.bonusResultDetail.create({
            data: {
              number: first.number[i].value,
              price: parseInt(first.price),
              bonusDate: date,
            },
          });
        }

        for (let i = 0; i < second.number.length; i++) {
          await prisma.bonusResultDetail.create({
            data: {
              number: second.number[i].value,
              price: parseInt(second.price),
              bonusDate: date,
            },
          });
        }

        for (let i = 0; i < third.number.length; i++) {
          await prisma.bonusResultDetail.create({
            data: {
              number: third.number[i].value,
              price: parseInt(third.price),
              bonusDate: date,
            },
          });
        }

        for (let i = 0; i < fourth.number.length; i++) {
          await prisma.bonusResultDetail.create({
            data: {
              number: fourth.number[i].value,
              price: parseInt(fourth.price),
              bonusDate: date,
            },
          });
        }

        for (let i = 0; i < fifth.number.length; i++) {
          await prisma.bonusResultDetail.create({
            data: {
              number: fifth.number[i].value,
              price: parseInt(fifth.price),
              bonusDate: date,
            },
          });
        }

        for (let i = 0; i < last2.number.length; i++) {
          await prisma.bonusResultDetail.create({
            data: {
              number: '0000' + last2.number[i].value,
              price: parseInt(last2.price),
              bonusDate: date,
            },
          });
        }

        for (let i = 0; i < last3f.number.length; i++) {
          await prisma.bonusResultDetail.create({
            data: {
              number: last3f.number[i].value + '000',
              price: parseInt(last3f.price),
              bonusDate: date,
            },
          });
        }

        for (let i = 0; i < last3b.number.length; i++) {
          await prisma.bonusResultDetail.create({
            data: {
              number: '000' + parseInt(last3b.number[i].value),
              price: parseInt(last3b.price),
              bonusDate: date,
            },
          });
        }

        for (let i = 0; i < near1.number.length; i++) {
          await prisma.bonusResultDetail.create({
            data: {
              number: near1.number[i].value,
              price: parseInt(near1.price),
              bonusDate: date,
            },
          });
        }
        return { message: 'success' };
      } else {
        return { message: 'exists' };
      }
    } catch (e) {
      return { message: e };
    }
  }

  @Get('/list')
  async list() {
    try {
      const res = await prisma.bonusResultDetail.groupBy({
        by: ['bonusDate'],
        orderBy: {
          bonusDate: 'desc',
        },
      });
      return { results: res };
    } catch (e) {
      throw { message: e };
    }
  }

  @Get('/listDetail/:bonusDate')
  async listDetail(@Param('bonusDate') bonusDate: string) {
    try {
      const resDetail = await prisma.bonusResultDetail.findMany({
        where: {
          bonusDate: new Date(bonusDate),
        },
        orderBy: {
          price: 'desc',
        },
      });
      return { results: resDetail };
    } catch (e) {
      return { message: e };
    }
  }

  @Get('/checkBonus')
  async checkBonus() {
    try {
      const billSaleDatail = await prisma.billSaleDatail.findMany({
        include: {
          lotto: true,
        },
        where: {
          billSale: {
            payDate: {
              not: null,
            },
            customerAddress: '',
          },
          lotto: {
            isCheckBonus: 0,
          },
        },
      });

      const lastResult = await prisma.bonusResultDetail.findFirst({
        orderBy: {
          bonusDate: 'desc',
        },
      });

      const bonusResultDetail = await prisma.bonusResultDetail.findMany({
        where: {
          bonusDate: lastResult.bonusDate,
        },
      });

      for (let i = 0; i < billSaleDatail.length; i++) {
        const item = billSaleDatail[i];

        for (let j = 0; j < bonusResultDetail.length; j++) {
          const item2 = bonusResultDetail[j];

          if (item.lotto.number == item2.number) {
            console.log('luckey', item2.price, 'number is', item2.number);

            await prisma.billSaleDatailIsBonus.create({
             data:{
              bonusDate: item2.bonusDate,
              bonusPrice: item2.price,
              number: item2.number + '',
              billSaleDetailId: item.id,
              bonusResultDetailId: item2.id,
             }
            });
          }
        }
      }
      await prisma.lotto.updateMany({
        data: {
          isCheckBonus: 1,
        },
        where: {
          isCheckBonus: 0,
        },
      });

      const resultsBonus = await prisma.billSaleDatailIsBonus.findMany({
        include: {
          billSaleDetail: {
            include: {
              billSale: true,
            },
          },
        },
      });
      return { message: 'success', results: resultsBonus };
    } catch (e) {
      return { message: e };
    }
  }
  @Get('/lottoIsBonus')
  async lottoIsBonus() {
    try {
      //หาผลรางวัลล่าสุด
      const bonusRow = await prisma.bonusResultDetail.findFirst({
        orderBy: {
          bonusDate: 'desc',
        },
      });

      //หาผลรางวัลทั้งหมดในงวดล่าสุด
      const bonusResults = await prisma.bonusResultDetail.findMany({
        where: {
          bonusDate: bonusRow.bonusDate,
        },
      });

      //lotteryที่อยู่กับเรา
      const lottos = await prisma.lotto.findMany({
        where: {
          isSale: 1,
        },
      });

      for (let i = 0; i < lottos.length; i++) {
        const item = lottos[i];

        for (let j = 0; j < bonusResults.length; j++) {
          const bonusResult = bonusResults[j];

          if (bonusResult.number == item.number) {
            //บันทึกผลรางวัลเก็บไว้
            const findRow = await prisma.lottoIsBonus.findFirst({
              where: {
                bonusResultDetailId: bonusResult.id,
              },
            });

            if(findRow == null) {
              await prisma.lottoIsBonus.create({
                data: {
                  bonusResultDetailId: bonusResult.id,
                },
              });
            }
          }
        }
      }
      return { message: 'success'}
    } catch (e) {
      return { message: e };
    }
  }

  @Get('lottoIsBonusList')
  async lottoIsBonusList() {
    try{
      const res = await prisma.lottoIsBonus.findMany({
        orderBy: {
          id: 'desc'
        },
        include: {
          BonusResultDetail: true,
        }
      });
      return { results: res}
    }catch(e) {
      return { message: e };
    }
  }

}
