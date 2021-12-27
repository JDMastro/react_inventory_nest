import { Controller, Get, Param } from '@nestjs/common';
import { SettingsService } from "../service/settings.service";
import { kindmovementsService } from "../../kindmovements/service/kindmovements.service";

@Controller('api/settings')
export class SettingsController {

    constructor(
        private _settingsService: SettingsService,
        private _kindmovementsService : kindmovementsService
    ) { }

    @Get(":key")
    async findByKey(@Param('key') key : string)
    {
        const setting = await this._settingsService.findByKey(key)

        if(!setting)
           return { success: false, data: null, error: "Configure el movimiento de produccion en configuraciones" }

        const kind_mov = await this._kindmovementsService.findById(parseInt(setting.value))

        if(!kind_mov)
           return { success: false, data: null, error: `No se encontró movimiento: ${setting.value}` }

      return { success : true, data : kind_mov, error : null  }
    }


}