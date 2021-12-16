import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from "./entities/users.entity";
import { PersonModule } from "../person/person.module";

@Module({
  imports : [TypeOrmModule.forFeature([Users]), PersonModule],
  providers: [UsersService],
  controllers: [UsersController],
  
})
export class UsersModule {}
