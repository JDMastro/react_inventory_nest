import { Module } from '@nestjs/common';
import { StatusService } from './service/status.service';
import { StatusController } from './controller/status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from "./entities/status.entity";
import { UsersModule } from "../users/users.module";

@Module({
  imports : [TypeOrmModule.forFeature([Status]), UsersModule],
  providers: [StatusService],
  controllers: [StatusController]
})
export class StatusModule {}
