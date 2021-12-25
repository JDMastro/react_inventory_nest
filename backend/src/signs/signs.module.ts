import { Module } from '@nestjs/common';
import { SignsService } from './service/signs.service';
import { SignsController } from './controller/signs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Signs } from "./entities/signs.entity";

@Module({
  imports : [TypeOrmModule.forFeature([Signs])],
  providers: [SignsService],
  controllers: [SignsController]
})
export class SignsModule {}
