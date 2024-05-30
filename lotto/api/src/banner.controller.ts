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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  PrismaClient,
  Lotto,
  BillSaleDatail,
  BillSale,
  BillSaleForSend,
} from '@prisma/client';
import { diskStorage } from 'multer';
import { extname } from 'path';

const prisma = new PrismaClient();

@Controller('/api/banner')
export class BannerController {
  @Post('uploadFile')
  @UseInterceptors(
    FileInterceptor('myFile', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      await prisma.banner.create({
        data: {
          name: file.filename,
        },
      });
      //return { file: file };
      return { message: 'success' };
    } catch (e) {
      return { message: e };
    }
  }

  @Get('list')
  async list() {
    try {
      const res = await prisma.banner.findMany({
        orderBy: {
          id: 'desc',
        },
      });
      return { results: res };
    } catch (e) {
      return { message: e };
    }
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string) {
    try {
      const idValue = parseInt(id);

      const banner = await prisma.banner.findFirst({
        where: {
          id: idValue,
        },
      });

      const res = await prisma.banner.delete({
        where: {
          id: idValue,
        },
      });

      if (res.id != undefined) {
        const fs = await require('fs');
        fs.unlink('./uploads/' + banner.name, (err) => {
          if (err) {
            return { message: err };
          }
        });
        return { message: 'success' };
      }
      return { message: 'delete error' };
    } catch (e) {
      return { message: e };
    }
  }
}
