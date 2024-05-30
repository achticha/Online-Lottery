import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService} from './auth.service';
import { JwtStrategy} from './jwt.strategy';
import { CompanyController } from './company.controller';
import { LottoController } from './lotto.controller';
import { BonusController } from './bonus.controller';
import {BillSaleController} from './billSale.controller';
import {BannerController} from './banner.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path'; //ใช้ในการเชื่อมพาท
//import {SlipController} from './slip'
import {Test1} from './test1'
@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: {expiresIn: '1h'}
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads'
    }),
  ],
  controllers: [AppController, UserController, CompanyController, LottoController, BonusController, BillSaleController,BannerController,Test1],
  providers: [AppService,AuthService,JwtStrategy],
})
export class AppModule {}
