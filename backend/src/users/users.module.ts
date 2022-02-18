import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from "./entities/users.entity";
import { PersonModule } from "../person/person.module";
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports : [TypeOrmModule.forFeature([Users]), PersonModule,JwtModule.register({
    secret :'secret',
    signOptions:{ expiresIn: '1d' }
  }),],
  providers: [UsersService],
  controllers: [UsersController],
  
  exports:[UsersService]
  
})
export class UsersModule {}
