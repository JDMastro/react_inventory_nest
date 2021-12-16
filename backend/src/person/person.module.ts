import { Module } from '@nestjs/common';
import { PersonService } from './service/person.service';
import { PersonController } from './controller/person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from "./entities/person.entity";

@Module({
  imports : [TypeOrmModule.forFeature([Person])],
  providers: [PersonService],
  controllers: [PersonController],
  exports : [PersonService]
})
export class PersonModule {}
