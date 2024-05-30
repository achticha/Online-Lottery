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
import {
  PrismaClient,
  Lotto,
  BillSaleDatail,
  BillSale,
  BillSaleForSend,
} from '@prisma/client';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { interval } from 'rxjs';
import { log } from 'console';

const prisma = new PrismaClient();

@Controller('/api/lotto')
export class LottoController {
  @Post('creact')
  async creact(@Body() lotto: Lotto) {
    lotto.lottoDate = new Date(lotto.lottoDate);
    const res = await prisma.lotto.create({ data: lotto });
    return { result: res };
  }

  @Get('list')
  async list() {
    return {
      results: await prisma.lotto.findMany({
        orderBy: {
          isSale: 'asc'
        },
      }),
    };
  }

  @Get('listForSale')
  async listForSale() {
    try {
      const results = await prisma.lotto.findMany({
        orderBy: {
          id: 'desc',
        },
        where: {
          isSale: 0
        }
      });
      return{results: results}
      // let arr = [];

      // for (let i = 0; i < results.length; i++) {
      //   const item = results[i];
      //   const billSaleDatail = await prisma.billSaleDatail.findFirst({
      //     where: {
      //       lottoId: item.id,
      //       billSale: {
      //         payDate: {
      //           not: null
      //         }
      //       }
      //     },
      //   });
      //   if (billSaleDatail == null) {
      //     arr.push(item);
      //   }
      // }
      // return { results: arr };
    } catch (e) {
      return { message: e };
    }
  }

  @Delete('remove/:id')
  async remove(@Param('id') paramId: string) {
    const id = parseInt(paramId);
    const res = await prisma.lotto.delete({ where: { id: id } });
    return { result: res };
  }

  @Put('edit/:id')
  async edit(@Body() lotto: Lotto, @Param('id') id: string) {
    lotto.lottoDate = new Date(lotto.lottoDate);
    const newid = parseInt(id);
    return {
      result: await prisma.lotto.update({ data: lotto, where: { id: newid } }),
    };
  }
  @Post('search')
  async search(
    @Body('number') input: string,
    @Body('position') position: string,
  ) {
    let condition = {};
    if (position == 'start') {
      condition = { startsWith: input };
    } else {
      condition = {
        endsWith: input,
      };
    }
    return {
      results: await prisma.lotto.findMany({
        where: {
          number: condition,
          isSale: 0
        },
        
      }),
    };
  }
  @Post('addtocart')
  async addToCart(@Body('lottos') lotto: Lotto) {
    try {
      
    
    }catch (e) {
      return { message: e.message };
    }
  }
   


  @Post('confirmBuy')
  async confirmBuy(
    @Body('customerName') customerName: string,
    @Body('customerPhone') customerPhone: string,
    @Body('customerAddress') customerAddress: string,
    @Body('carts') carts: [{ item: BillSaleDatail }],
  ) {
    try {
      const res = await prisma.billSale.create({
        data: {
          customerName: customerName,
          customerPhone: customerPhone,
          customerAddress: customerAddress,
          createdDate: new Date(),
        },
      });
      if (res.id != undefined) {
        for (let i = 0; i < carts.length; i++) {
          const item = carts[i].item;

          const lottos = await prisma.lotto.findFirst({
            where: {
              id: item.id,
            },
          });
          console.log(lottos);

          await prisma.billSaleDatail.create({
            data: {
              billSaleId: res.id,
              lottoId: item.id,
              price: lottos.sale,
            },
          });
        }
        return { message: 'success' };
      }
      return { message: 'insert error' };
    } catch (e) {
      return { message: e.message };
    }
  }

  @Get('billSale')
  async billSale() {
    try {
      const res = await prisma.billSale.findMany({
        orderBy: {
          id: 'desc',
        },
        include: {
          billSaleDetail: {
            include: {
              lotto: true,
            },
          },
        },
      });
      return { result: res };
    } catch (e) {
      return { message: e.message };
    }
  }

  @Delete('removeBill/:id')
  async removeBill(@Param('id') id: string) {
    try {
      const idValue = parseInt(id);
      const removeBillSaleDelail = prisma.billSaleDatail.deleteMany({
        where: { billSaleId: idValue },
      });
      const removeBillSale = prisma.billSale.delete({ where: { id: idValue } });
      await prisma.$transaction([removeBillSaleDelail, removeBillSale]);
      return { message: 'success' };
    } catch (e) {
      return { message: e };
    }
  }

  @Post('/confirmPay')
  async confirmPay(@Body('billSale') billSale: BillSale) {
    try {
      await prisma.billSale.update({
        data: {
          payAlertData: new Date(billSale.payAlertData),
          payTime: billSale.payTime,
          payDate: new Date(billSale.payDate),
          payRemark: billSale.payRemark,
        },
        where: {
          id: billSale.id,
        },
      });
      const lottos = await prisma.billSaleDatail.findMany({
        where: {
          billSaleId: billSale.id,
        },
        include: {
          lotto: true
        }
      });

      for (let i = 0; i < lottos.length; i++) {
        const item = lottos[i];
        await prisma.lotto.update({
          data: {
            isSale: 1,
          },
          where: {
            id: item.lotto.id,
          },
        });
      }

      return { message: 'success' };
    } catch (e) {
      return { message: e };
    }
  }

  @Get('/wherecf')
  async where() {
    try {
      const result = await prisma.billSale.findMany({
        where: {
          payDate: {
            not: null,
          }
        },
        orderBy: {
          id: 'desc',
        },
        include: {
          billSaleDetail: {
            include: {
              lotto: true,
            },
          },
        },
      });

      return { results: result };
    } catch (e) {
      return { message: e };
    }
  }

  @Get('/lottoInShop')
  async lottoInShop() {
    try {
      const result = await prisma.billSale.findMany({
        where: {
          payDate: {
            not: null,
          },
          customerAddress: '',
        },
        orderBy: {
          id: 'desc',
        },
        include: {
          billSaleDetail: {
            include: {
              lotto: true,
            },
          },
        },
      });

      return { results: result };
    } catch (e) {
      return { message: e };
    }
  }

  @Get('/lottoForSend')
  async lottoForSend() {
    try {
      const result = await prisma.billSale.findMany({
        where: {
          payDate: {
            not: null,
          },
          customerAddress: {
            not: '',
          },
        },
        orderBy: {
          id: 'desc',
        },
        include: {
          billSaleDetail: {
            include: {
              lotto: true,
            },
          },
          BillSaleForSend: true,
        },
      });

      return { results: result };
    } catch (e) {
      return { message: e };
    }
  }

  @Post('/sendSave')
  async sendSave(@Body('data') data: BillSaleForSend) {
    try {
      const rowCount = await prisma.billSaleForSend.findMany({
        where: {
          billSaleId: data.billSaleId,
        },
      });
      if (rowCount.length == 0) {
        const res = await prisma.billSaleForSend.create({
          data: data,
        });

        if (res.id > 0) {
          return { message: 'success' };
        }
        return { message: 'not implemented' };
      } else {
        return { message: 'data exists' };
      }
    } catch (e) {
      return { message: e };
    }
  }

  @Put('changePrice')
  async changePrice(@Body() data){
    try{
      for(let i = 0; i < data.length; i++){
        const item = data[i];

        await prisma.lotto.update({
          where: {
            id: item.id
          },
          data: {
            sale: item.newPrice
          }
        })
      }
      return { message: 'success' };
    }catch(e){
      return { message: e };
    }
  }
}
