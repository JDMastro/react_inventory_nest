import { Module } from '@nestjs/common';
import { kindmovementsService } from './service/kindmovements.service';
import { kindmovementsController } from './controller/kindmovements.controller';
import { KindMovements } from "./entities/kindmovements.entity";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [TypeOrmModule.forFeature([KindMovements])],
  providers: [kindmovementsService],
  controllers: [kindmovementsController],
  exports:[kindmovementsService]
})
export class KindmovementsModule {}
