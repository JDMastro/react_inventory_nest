import { Module } from '@nestjs/common';
import { ClassificationPeopleService } from './service/classificationPeople.service';
import { ClassificationPeopleController } from './controller/classificationPeople.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { classificationPeople } from "./entities/classificationPeople.entity";

@Module({
  imports : [TypeOrmModule.forFeature([classificationPeople])],
  providers: [ClassificationPeopleService],
  controllers: [ClassificationPeopleController]
})
export class classificationPeopleModule {}
