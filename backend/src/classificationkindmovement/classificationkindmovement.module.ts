import { Module } from '@nestjs/common';
import { ClassificationKindMovementService } from './service/classificationkindmovement.service';
import { ClassificationKindMovementController } from './controller/classificationkindmovement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassificationKindMovement } from "./entities/classificationkindmovement.entity";

@Module({
  imports : [TypeOrmModule.forFeature([ClassificationKindMovement])],
  providers: [ClassificationKindMovementService],
  controllers: [ClassificationKindMovementController]
})
export class ClassificationkindmovementModule {}
