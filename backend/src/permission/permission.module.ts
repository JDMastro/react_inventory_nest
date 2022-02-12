import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionService } from './service/permission.service';
import { Permission } from "./entities/permission.entity";
import { PermissionController } from './controller/permission.controller';
import { UsersModule } from "../users/users.module";
import { PermissionUser } from "./entities/permission_user.entity";

@Module({
  imports : [TypeOrmModule.forFeature([Permission]), TypeOrmModule.forFeature([PermissionUser]), UsersModule],
  providers: [PermissionService],
  controllers: [PermissionController]
})
export class PermissionModule {}
