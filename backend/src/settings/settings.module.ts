import { Module } from '@nestjs/common';
import { SettingsService } from './service/settings.service';
import { SettingsController } from './controller/settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Settings } from './entities/settings.entity'
import { KindmovementsModule } from "../kindmovements/kindmovements.module";

@Module({
  imports : [TypeOrmModule.forFeature([Settings]), KindmovementsModule],
  providers: [SettingsService],
  controllers: [SettingsController]
})
export class SettingsModule {}
