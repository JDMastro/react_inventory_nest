import { Module } from '@nestjs/common';
import { ProductsService } from './service/products.service';
import { ProductsController } from './controller/products.controller';
import { Products } from "./entities/products.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsModule } from '../settings/settings.module'
import { UsersModule } from "../users/users.module";

@Module({
  imports : [TypeOrmModule.forFeature([Products]), SettingsModule, UsersModule],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports:[ProductsService]
})
export class ProductsModule {}
