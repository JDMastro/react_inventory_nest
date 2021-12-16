import { Module } from '@nestjs/common';
import { ConsecutiveService } from './service/consecutive.service';
import { ConsecutiveController } from './controller/consecutive.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consecutive } from "../consecutive/entities/consecutive.entity";

@Module({
  imports : [TypeOrmModule.forFeature([Consecutive])],
  providers: [ConsecutiveService],
  controllers: [ConsecutiveController],
  exports:[ConsecutiveService]
})
export class ConsecutiveModule {}
