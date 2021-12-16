import { Module } from '@nestjs/common';
import { kindidentityService } from './service/kindidentity.service';
import { kindidentityController } from './controller/kindidentity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kindidentity } from "./entities/kindidentity.entity";

@Module({
  imports : [TypeOrmModule.forFeature([Kindidentity])],
  providers: [kindidentityService],
  controllers: [kindidentityController]
})
export class KindidentityModule {}
