import { Module } from '@nestjs/common';
import { MovementsService } from './service/movements.service';
import { MovementsController } from './controller/movements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movements } from "./entities/movements.entity";
import { HeaderModule } from "../header/header.module";
import { ConsecutiveModule } from "../consecutive/consecutive.module";
import { ProductsModule } from "../products/products.module";
import { ConversionModule } from "../conversion/conversion.module";
import { SettingsModule } from '../settings/settings.module'
import { UsersModule } from "../users/users.module";

@Module({
  imports : [TypeOrmModule.forFeature([Movements]), UsersModule, SettingsModule, HeaderModule,ConsecutiveModule, ProductsModule, ConversionModule],
  providers: [MovementsService],
  controllers: [MovementsController],
})
export class MovementsModule {}
