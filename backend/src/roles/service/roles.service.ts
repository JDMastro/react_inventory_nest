import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from "../entities/roles.entity";
//import { Not } from "typeorm";

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Roles) private _RolesRepo: Repository<Roles>,
    ) { }

    async findAll() {
        //return await this._RolesRepo.find({ where : { name : Not('EMPLEADO') } });
        return await this._RolesRepo.find();
    }
}
