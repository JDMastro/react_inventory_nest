import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { Users } from "../entities/users.entity";
import { UsersDto } from "../dto/users.dto";
import { Kindidentity } from "../../kindidentity/entities/kindidentity.entity";
import { Person } from "../../person/entities/person.entity";
import { classificationPeople } from "../../classification_people/entities/classificationPeople.entity";
import { JwtService } from '@nestjs/jwt';
import { PermissionUser } from "../../permission/entities/permission_user.entity";
import { Permission } from "../../permission/entities/permission.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private UsersRepo: Repository<Users>,
        private jwtService: JwtService
    ) { }

    async findAll(page : number, perPage : number) {
        const data = await getManager().createQueryBuilder("users", "u")
        .select([
            "u.id as id" ,"u.code", "u.email", "u.person_id", "k.id as kind_id", 
            "k.description as kind_description", "p.fullname", "p.idnumber"," p.address"," p.phone",
            "p.contact", "p.name", "p.second_name", "p.first_surname", "p.second_surname", "cp.name", "cp.id", "p.actived"
        ])
        .innerJoin(Person, "p", "p.id = u.person_id")
        .innerJoin(Kindidentity, "k", "k.id = p.kind_id")
        .innerJoin(classificationPeople, "cp", "cp.id = p.classificationpeople_id")
        .where("cp.name != 'PROVEEDOR'")
        .orderBy("p.fullname")
        //.getRawMany()

        const total = await data.getCount()

        return {
            data : await data.getRawMany(),
            total,
            page_count : perPage,
            current_page : page,
            last_page : Math.ceil(total/perPage)
          }
    }

    async verifyToken(token : any)
    {
        return await this.jwtService.verifyAsync(token)
    }

    async findUserByEmail(email : string)
    {
        return await this.UsersRepo.findOne({ where: { email } })
    }

    async findUserById(id : number)
    {
        return await this.UsersRepo.findOne({ where: { id } })
    }

    async findUserByPersonId(id : number)
    {
        return await this.UsersRepo.findOne({ where: { person_id : id } })
    }

    async findUserByCode(code : string)
    {
        return await this.UsersRepo.findOne({ where: { code } })
    }

    async getLastInserted(id : number)
    {
        return await getManager().createQueryBuilder("users", "u")
        .select([
            "u.id as id" ,"u.code", "u.email", "u.person_id", "k.id as kind_id", 
            "k.description as kind_description", "p.fullname", "p.idnumber"," p.address"," p.phone",
            "p.contact", "p.name", "p.second_name", "p.first_surname", "p.second_surname", "cp.name", "cp.id", "p.actived"
        ])
        .innerJoin(Person, "p", "p.id = u.person_id")
        .innerJoin(Kindidentity, "k", "k.id = p.kind_id")
        .innerJoin(classificationPeople, "cp", "cp.id = p.classificationpeople_id")
        .where("u.id = :id", { id })
        .getRawOne()
    }

    async create(body : UsersDto)
    {
        const { email, code, password, person_id } = body
        const user = await this.UsersRepo.save({  email, code, password, person_id })
        return this.getLastInserted(user.id)
    }

    async update (id: number, body: UsersDto)
    {
        const user = await this.UsersRepo.findOne(id);

        await this.UsersRepo.merge( user ,{
            code : body.code,
            email : body.email,
            password : body.password,
            actived : body.actived
        })
        const res = await this.UsersRepo.save(user)

        return await this.getLastInserted(id)
    }

    async delete(id : number)
    {
        //await this.UsersRepo.delete(id)
        //return true

        const person = await this.UsersRepo.findOne(id)

        await this.UsersRepo.merge(person,{ actived : false })

        const updated = await this.UsersRepo.save(person)

        return this.getLastInserted(updated.id)
    }

    async userPermission(user_id : number){
        return await getManager().createQueryBuilder("users","u")
        .select(["p.permission"])
           .innerJoin(PermissionUser,"pu","u.id = pu.user_id")
           .innerJoin(Permission, "p","p.id = pu.permission_id ")
           .where("u.id = :user_id",{ user_id })
           .getRawMany()
    }
}
