import { Controller, Get, Post, Body, Put, Param, Delete, Res, Req, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from '../dto/auth.dto';
import { UsersDto, UsersEmployeeDto } from "../dto/users.dto";
import { UsersService } from "../service/users.service";
import { PersonService } from "../../person/service/person.service";
import { compare_password, encrypt } from "../../helper/encrypt";
import { Users } from "../entities/users.entity";
import { Person } from "../../person/entities/person.entity";

import { JwtService } from '@nestjs/jwt';
import { Response, Request } from "express";


@Controller('api/users')
export class UsersController {
    constructor(
        private UsersService: UsersService,
        private _personService: PersonService,
        private jwtService: JwtService
    ) { }

    @Get()
    async findAll() {
        return await this.UsersService.findAll()
    }

    @Post('login')
    async login(@Body() body: AuthDto, @Res({ passthrough : true }) response : Response ) {
        const { email, password } = body
        const user = await this.UsersService.findUserByEmail(email)

        if (!user)
            return { success: false, data: null, error: "Credenciales invalidas" }

        if (! await compare_password(password, user.password))
            return { success: false, data: null, error: "Credenciales invalidas" }

        const jwt = await this.jwtService.signAsync({ id : user.person_id })

        response.cookie('jwt',jwt,{ httpOnly : true, path : "/", secure : true, sameSite :"none" })

        return { success: true, data: null, error: null }
    }

    @Post("register")
    async register(@Body() body: UsersEmployeeDto) {
        const { code, email, password,
            kind_id, idnumber, name, second_name,
            first_surname, second_surname, fullname, address,
            phone, contact, user_id } = body

        const errors: any = []
        const users = new Users()
        const person = new Person()
        const check_email = await this.UsersService.findUserByEmail(email)
        const check_code = await this.UsersService.findUserByCode(code)
        const check_idnumber = await this._personService.findByIdNumber(idnumber)
        const check_phone = await this._personService.findByPhone(phone)

        let res : any


        if (check_email)
            errors.push({ field: "email", msg: "Este correo esta registrado" })

        if (check_code)
            errors.push({ field: "code", msg: "Este codigo esta registrado" })

        if (check_idnumber)
            errors.push({ field: "idnumber", msg: "Este número de cedula esta registrado" })

        if (check_phone)
            errors.push({ field: "phone", msg: "Este teléfono esta registrado" })




        if (errors.length < 1) {
            person.address = address
            person.contact = contact
            person.first_surname = first_surname
            person.fullname = fullname
            person.idnumber = idnumber
            person.kind_id = kind_id
            person.name = name
            person.phone = phone
            person.roles_id = 3
            person.second_name = second_name
            person.second_surname = second_surname
            person.user_id = user_id
           // person.is_employee = true



            const per = await this._personService.create(person)
            console.log("-------------------->",per)


            users.code = code
            users.email = email
            users.password = await encrypt(password)
            users.person_id = per.id

            res = await this.UsersService.create(users)

        }





        return errors.length > 0 ?
            { success: false, data: null, errors } :
            { success: true, data: res, errors: null }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: any) {
        const { code, email, password,
            kind_id, idnumber, name, second_name,
            first_surname, second_surname, fullname, address,
            phone, contact, user_id, person_id } = body

        const errors: any = []
        const users = new Users()
        const person = new Person()

        person.address = address
        person.contact = contact
        person.first_surname = first_surname
        person.fullname = fullname
        person.idnumber = idnumber
        person.kind_id = kind_id
        person.name = name
        person.phone = phone
        person.roles_id = 3
        person.second_name = second_name
        person.second_surname = second_surname
        person.user_id = user_id
        

        try {
            const per = await this._personService.update(person_id, person)
            console.log(per.id)


            users.code = code
            users.email = email
            users.password = await encrypt(password)

            const res = await this.UsersService.update(id, users)
            return { success: true, data: res, error: null }
        } catch (err) {
            var regExp = /\(([^)]+)\)/;

           
            var error = regExp.exec(err.detail)[1].trim()


            var res = error.trim().split(",").map(e => {
                return {
                    field: e.trim(), msg: e.trim() === "code" ? "Este código esta registrado" :
                        e.trim() === "email" ? "Este correo esta registrado" :
                            e.trim() === "idnumber" ? "Este número de cedula esta registrado" : "Este teléfono esta registrado"
                }
            })

            return { success: false, data: null, errors: res }
        }
    }

    @Delete(':id/:person_id')
    async remove(@Param('id') id: number, @Param('person_id') person_id: number) {
        try {
            await this.UsersService.delete(id)
            await this._personService.delete(person_id)
            return { success: true, data: null, error: null }
        } catch (err) {
            return { success: false, data: null, error: "No se puede eliminar, hay registros que dependen de este" }
        }
    }


    @Post('logout')
    async logout(@Res({ passthrough : true }) response : Response)
    {
        response.clearCookie('jwt')
        return {
            success : true
        }
    }


    @Get('test')
    async test(@Req() request :Request )
    {
        try {
            const cookie = request.cookies['jwt']

            const data = await this.jwtService.verifyAsync(cookie)
            if(!data)
               throw new UnauthorizedException()

            return data['id']
        } catch (e) {
            throw new UnauthorizedException()
        }
    }


}
