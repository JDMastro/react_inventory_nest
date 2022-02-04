import { Module } from '@nestjs/common';
import { ClientManufacturerService } from './service/clientManufacturer.service';
import { ClientManufacturerController } from './controller/clientManufacturer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientManufacturer } from "./entities/clientManufacturer.entity";
import { UsersModule } from 'src/users/users.module';

@Module({
  imports : [TypeOrmModule.forFeature([ClientManufacturer]), UsersModule],
  providers: [ClientManufacturerService],
  controllers: [ClientManufacturerController]
})
export class ClientManufacturerModule {}
