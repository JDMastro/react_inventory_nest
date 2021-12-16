import { Module } from '@nestjs/common';
import { StatusService } from './service/status.service';
import { StatusController } from './controller/status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from "./entities/status.entity";

@Module({
  imports : [TypeOrmModule.forFeature([Status])],
  providers: [StatusService],
  controllers: [StatusController]
})
export class StatusModule {}
