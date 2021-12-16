import { Module } from '@nestjs/common';
import { MovementsService } from './service/movements.service';
import { MovementsController } from './controller/movements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movements } from "./entities/movements.entity";
import { HeaderModule } from "../header/header.module";
import { ConsecutiveModule } from "../consecutive/consecutive.module";

@Module({
  imports : [TypeOrmModule.forFeature([Movements]), HeaderModule,ConsecutiveModule],
  providers: [MovementsService],
  controllers: [MovementsController]
})
export class MovementsModule {}
