import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { Users } from "../entities/users.entity";
import { UsersDto } from "../dto/users.dto";
import { Kindidentity } from "../../kindidentity/entities/kindidentity.entity";
import { Person } from "../../person/entities/person.entity";
import { Roles } from "../../roles/entities/roles.entity";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private UsersRepo: Repository<Users>,
        private jwtService: JwtService
    ) { }

    async findAll() {
        return await getManager().createQueryBuilder("users", "u")
        .select([
            "u.id" ,"u.code", "u.email", "u.person_id", "k.id as kind_id", 
            "k.code as kind_code", "p.fullname", "p.idnumber"," p.address"," p.phone",
            "p.contact", "p.name", "p.second_name", "p.first_surname", "p.second_surname"
        ])
        .innerJoin(Person, "p", "p.id = u.person_id")
        .innerJoin(Kindidentity, "k", "k.id = p.kind_id")
        .innerJoin(Roles,"r","r.id = p.roles_id")
        .where("r.name = 'EMPLEADO'")
        .getRawMany()
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

    async findUserByCode(code : string)
    {
        return await this.UsersRepo.findOne({ where: { code } })
    }

    async create(body : UsersDto)
    {
        const { email, code, password, person_id } = body
        return delete (await this.UsersRepo.save({  email, code, password, person_id })).password
    }

    async update (id: number, body: UsersDto)
    {
        const user = await this.UsersRepo.findOne(id);

        await this.UsersRepo.merge( user ,{
            code : body.code,
            email : body.email,
            password : body.password
        })
        return await this.UsersRepo.save(user)
    }

    async delete(id : number)
    {
        await this.UsersRepo.delete(id)
        return true
    }
}
