import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeaderService } from './service/header.service';
import { Header } from "./entities/header.entity";
import { HeaderController } from './controller/header.controller';

@Module({
  imports : [TypeOrmModule.forFeature([Header])],
  providers: [HeaderService],
  controllers: [HeaderController],
  exports : [HeaderService]
})
export class HeaderModule {}
