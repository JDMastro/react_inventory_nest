import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Not, Repository } from 'typeorm';
import { Person } from "../entities/person.entity";
import { personDto } from "../dto/person.dto";

import { Kindidentity } from "../../kindidentity/entities/kindidentity.entity";
import { classificationPeople } from "../../classification_people/entities/classificationPeople.entity";


@Injectable()
export class PersonService {
    constructor(
        @InjectRepository(Person) private _personRepo: Repository<Person>,
    ) { }

    async findAll(page : number, perPage : number) {
        const data = await getManager().createQueryBuilder("person", "p")
        .select([
            "p.id as id", 
            "p.kind_id", 
            "k.description as kind_description", 
            "p.idnumber", 
            "p.fullname", 
            "p.address",
            "p.phone", 
            "p.contact", 
            "p.name", 
            "p.second_name", 
            "p.first_surname", 
            "p.second_surname", 
            "cp.name" , 
            "cp.id as classificationpeople_id",
            "p.actived"
        ])
        .innerJoin(Kindidentity, "k", "k.id = p.kind_id ")
        .innerJoin(classificationPeople, "cp", "cp.id = p.classificationpeople_id ")
        .where("cp.name = 'PROVEEDOR'")
        .orderBy("p.fullname", 'ASC')
        .offset((page - 1) * perPage)
        .limit(perPage)

        const total = await data.getCount()

        return {
            data : await data.getRawMany(),
            total,
            page_count : perPage,
            current_page : page,
            last_page : Math.ceil(total/perPage)
          }
    }

    async findAllPersonByRole(role_id : number){
        return this._personRepo.find({ where : { classificationpeople_id : role_id, actived : true} })
    }

    async findByIdNumber(idnumber : string)
    {
        return await this._personRepo.findOne({ where : { idnumber } })
    }
    async findByPhone(phone : string)
    {
        return await this._personRepo.findOne({ where : { phone } })
    }

    async getLastInserted(id : number)
    {
        return await getManager().createQueryBuilder("person", "p")
        .select([
            "p.id as id", 
            "p.kind_id",
            "k.description as kind_description", 
            "p.idnumber", "p.fullname", "p.address",
            "p.phone", 
            "p.contact", 
            "p.name", 
            "p.second_name", 
            "p.first_surname", 
            "p.second_surname", 
            "cp.name" , 
            "cp.id as classificationpeople_id",
            "p.actived"
        ])
        .innerJoin(Kindidentity, "k", "k.id = p.kind_id ")
        .innerJoin(classificationPeople, "cp", "cp.id = p.classificationpeople_id")
        .where("p.id = :id", { id })
        .getRawOne()
    }

    async create(body : personDto){
        const { address, contact, first_surname, fullname, 
            idnumber, kind_id, name, phone, classificationpeople_id, 
            second_name, user_id, second_surname  } = body

        const personSaved = await this._personRepo.save({ 
            address, contact, first_surname, fullname, 
            idnumber, kind_id, name, phone, classificationpeople_id, 
            second_name, user_id, second_surname })

            return await this.getLastInserted(personSaved.id)
    }

    async update(id: number, body: personDto)
    {
        const { address, contact, first_surname, fullname, 
            idnumber, kind_id, name, phone, classificationpeople_id, 
            second_name, user_id, second_surname, actived  } = body

        const person = await this._personRepo.findOne(id)

        await this._personRepo.merge(person,{
            address, contact, first_surname, fullname, 
            idnumber, kind_id, name, phone, classificationpeople_id, 
            second_name, user_id, second_surname, actived
        })

        const saved = await this._personRepo.save(person)

        return this.getLastInserted(id)
    }

    async delete(id : number)
    {
        /*await this._personRepo.delete(id)
        return true*/
        const person = await this._personRepo.findOne(id)

        await this._personRepo.merge(person,{ actived : false })

        const updated = await this._personRepo.save(person)

        return this.getLastInserted(id)
    }
}
