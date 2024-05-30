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
  @Controller('/api/test1')
  export class Test1 {
    @Post('/aomam')
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
          return {res: row };
        } else {
          return { message: 'exists' };
        }
      } catch (e) {
        return { message: e };
      }
    }
}