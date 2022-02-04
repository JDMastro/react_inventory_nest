import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { classificationPeople } from "../entities/classificationPeople.entity";
import { Not } from "typeorm";

@Injectable()
export class ClassificationPeopleService {
    constructor(
        @InjectRepository(classificationPeople) private _classificationPeople: Repository<classificationPeople>,
    ) { }

    async getAll(){
        return await this._classificationPeople.find()
    }

    async getClassificationUserOrEmpleado()
    {
        return await this._classificationPeople.find({ where : { name : Not('PROVEEDOR') } })
    }

    /*async getRoleProviderOrClient()
    {
        return await this._RolesRepo.find({ where : { name : Not('EMPLEADO') } })
    }

    async getRoleEmployeeOrClient()
    {
        return await this._RolesRepo.find({ where : { name : Not('PROVEEDOR') } })
    }

    async findAll() {
        //return await this._RolesRepo.find({ where : { name : Not('EMPLEADO') } });
        return await this._RolesRepo.find();
    }*/
}
