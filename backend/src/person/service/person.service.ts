import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Not, Repository } from 'typeorm';
import { Person } from "../entities/person.entity";
import { personDto } from "../dto/person.dto";

import { Kindidentity } from "../../kindidentity/entities/kindidentity.entity";
import { Roles } from "../../roles/entities/roles.entity";


@Injectable()
export class PersonService {
    constructor(
        @InjectRepository(Person) private _personRepo: Repository<Person>,
    ) { }

    async findAll() {
        return await getManager().createQueryBuilder("person", "p")
        .select([
            "p.id", "p.kind_id", "k.code as kind_code", "p.idnumber", "p.fullname", "p.address",
            "p.phone", "p.contact", "p.name", "p.second_name", "p.first_surname", "p.second_surname", "r.name" , "r.id as role_id"
        ])
        .innerJoin(Kindidentity, "k", "k.id = p.kind_id ")
        .innerJoin(Roles, "r", "r.id = p.roles_id ")
        .where("r.name != 'EMPLEADO'")
        .orderBy("p.fullname", 'ASC')
        .getRawMany()
    }

    async findAllPersonByRole(role_id : number){
        return this._personRepo.find({ where : { roles_id : role_id} })
    }

    async findByIdNumber(idnumber : number)
    {
        return await this._personRepo.findOne({ where : { idnumber } })
    }
    async findByPhone(phone : number)
    {
        return await this._personRepo.findOne({ where : { phone } })
    }

    async create(body : personDto){
        const { address, contact, first_surname, fullname, 
            idnumber, kind_id, name, phone, roles_id, 
            second_name, user_id, second_surname  } = body

        return await this._personRepo.save({ 
            address, contact, first_surname, fullname, 
            idnumber, kind_id, name, phone, roles_id, 
            second_name, user_id, second_surname })
    }

    async update(id: number, body: personDto)
    {
        const { address, contact, first_surname, fullname, 
            idnumber, kind_id, name, phone, roles_id, 
            second_name, user_id, second_surname  } = body

        const person = await this._personRepo.findOne(id)

        await this._personRepo.merge(person,{
            address, contact, first_surname, fullname, 
            idnumber, kind_id, name, phone, roles_id, 
            second_name, user_id, second_surname
        })

        return await this._personRepo.save(person)
    }

    async delete(id : number)
    {
        await this._personRepo.delete(id)
        return true
    }
}
