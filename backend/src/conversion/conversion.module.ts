import { Module } from '@nestjs/common';
import { ConversionService } from './service/conversion.service';
import { ConversionController } from './controller/conversion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversion } from "./entities/conversion.entity";

@Module({
  imports : [TypeOrmModule.forFeature([Conversion])],
  providers: [ConversionService],
  controllers: [ConversionController],
  exports:[ConversionService]
})
export class ConversionModule {}
