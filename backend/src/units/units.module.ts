import { Module } from '@nestjs/common';
import { UnitsService } from './service/unit.service';
import { UnitsController } from './controller/unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Units } from "./entities/units.entity";

@Module({
  imports : [TypeOrmModule.forFeature([Units])],
  providers: [UnitsService],
  controllers: [UnitsController]
})
export class UnitsModule {}
