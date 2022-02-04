import { Module } from '@nestjs/common';
import { SettingStatusService } from './service/settingstatus.service';
import { SettingStatusController } from './controller/settingstatus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingStatus } from "./entities/settingStatus.entity";

@Module({
  imports : [TypeOrmModule.forFeature([SettingStatus])],
  providers: [SettingStatusService],
  controllers: [SettingStatusController]
})
export class SettingsStatusModule {}
