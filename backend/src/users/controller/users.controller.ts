import { Controller, Get, Post, Body, Put, Param, Delete, Res, Req, UnauthorizedException, Query } from '@nestjs/common';
import { AuthDto } from '../dto/auth.dto';
import { UsersDto, UsersEmployeeDto } from "../dto/users.dto";
import { UsersService } from "../service/users.service";
import { PersonService } from "../../person/service/person.service";
import { compare_password, encrypt } from "../../helper/encrypt";
import { Users } from "../entities/users.entity";
import { Person } from "../../person/entities/person.entity";

import { JwtService } from '@nestjs/jwt';
import { Response, Request } from "express";

//import { ExtractJwt } from 'passport-jwt';


@Controller('api/users')
export class UsersController {
    constructor(
        private UsersService: UsersService,
        private _personService: PersonService,
        private jwtService: JwtService
    ) { }

    @Get()
    async findAll(@Query() req) {
        return await this.UsersService.findAll(req._page, req._limit)
    }

    @Post('login')
    async login(@Body() body: AuthDto, @Res({ passthrough : true }) response : Response ) {
        const { email, password } = body
        const user = await this.UsersService.findUserByEmail(email)

        

        if (!user){
            throw new UnauthorizedException("Credenciales invalidas")
         }
        if (! await compare_password(password, user.password) )
           { 
            throw  new UnauthorizedException("Credenciales invalidas")
         }
        if(!user.actived)
           { throw  new UnauthorizedException("Credenciales invalidas")

        }
        
        const jwt = await this.jwtService.signAsync({ id : user.person_id })

       // response.cookie('jwt',jwt,{ httpOnly : true, path : "/", secure : true, sameSite :"none" })

        return { 
            accessToken : jwt,
            tokenType : "Bearer"
        }
    }

    @Post("register")
    async register(@Body() body: UsersEmployeeDto) {
        const { code, email, password,
            kind_id, idnumber, name, second_name,
            first_surname, second_surname, fullname, address,
            phone, contact, user_id, classificationpeople_id } = body

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
            person.classificationpeople_id = classificationpeople_id
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
            phone, contact, user_id, person_id, classificationpeople_id, actived } = body

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
        person.classificationpeople_id = classificationpeople_id
        person.second_name = second_name
        person.second_surname = second_surname
        person.user_id = user_id
        person.actived = actived
        
        

        try {
            const per = await this._personService.update(person_id, person)
            console.log(per.id)


            users.code = code
            users.email = email
            users.password = await encrypt(password)
            users.actived = actived

            console.log("dasdasdas",actived)

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
            await this._personService.delete(person_id)
            
            const user = await this.UsersService.delete(id)
            return { success: true, data: user, error: null }
        } catch (err) {
            return { success: false, data: null, error: "No se puede eliminar, hay registros que dependen de este" }
        }
    }


    @Post('logout')
    async logout(@Res({ passthrough : true }) response : Response)
    {
       // response.clearCookie('jwt')
      /*  return {
            success : true
        }*/
    }


    @Get('me')
    async test(@Req() request :Request )
    {
        //console.log(request.headers.authorization)
        try {
            //const cookie = request.cookies['jwt']
            const token = request.headers.authorization
            //console.log(token.slice(7,token.length))

            const data = await this.jwtService.verifyAsync(token.slice(7,token.length))
            //console.log(data)

            if(!data)
               throw new UnauthorizedException()

            //data['id']

            //const user = await this._personService.findBydId(data['id'])
            //const permissions = await this.UsersService.userPermission(user.id)
            const user = await this._personService.findBydId(data['id'])
            const credentials = await this.UsersService.findUserByPersonId(data['id'])
            const permissions = await this.UsersService.userPermission(credentials.id)

            return {
                id : user.id,
                fullname : user.fullname,
                permissions : permissions.map(e => e.p_permission)
            }
        } catch (e) {
            throw new UnauthorizedException()
        }
    }


}
