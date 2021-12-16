import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { personDto } from "../dto/person.dto";
import { PersonService } from "../service/person.service";

@Controller('api/person')
export class PersonController {
    constructor(
        private _personService: PersonService
    ) { }

    @Get()
    async findAll() {
        return await this._personService.findAll()
    }

    @Get('role/:roleid')
    async findAllPersonByRole(@Param('roleid') role_id : number){
        return this._personService.findAllPersonByRole(role_id)
    }

    @Post()
    async register(@Body() body: personDto) {
        const { address, contact, first_surname, fullname,
            idnumber, kind_id, name, phone, roles_id,
            second_name, user_id, second_surname } = body

        const errors: any = []
        const person = new personDto()
        const check_idnumber = await this._personService.findByIdNumber(idnumber)
        const check_phone = await this._personService.findByPhone(phone)

        if (check_idnumber)
            errors.push({ field: "idnumber", msg: "Este número de cedula esta registrado" })

        if (check_phone)
            errors.push({ field: "phone", msg: "Este teléfono esta registrado" })


        person.address = address
        person.contact = contact
        person.first_surname = first_surname
        person.fullname = fullname
        person.idnumber = idnumber
        person.kind_id = kind_id
        person.name = name
        person.phone = phone
        person.roles_id = roles_id
        person.second_name = second_name
        person.second_surname = second_surname
        person.user_id = user_id



        return errors.length > 0 ?
            { success: false, data: null, errors } :
            { success: await this._personService.create(person), data: null, errors: null }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: personDto) {
        const { address, contact, first_surname, fullname,
            idnumber, kind_id, name, phone, roles_id,
            second_name, user_id, second_surname } = body

        const person = new personDto()

        person.address = address
        person.contact = contact
        person.first_surname = first_surname
        person.fullname = fullname
        person.idnumber = idnumber
        person.kind_id = kind_id
        person.name = name
        person.phone = phone
        person.roles_id = roles_id
        person.second_name = second_name
        person.second_surname = second_surname
        person.user_id = user_id


        try {
            return { success: true, data: await this._personService.update(id, person), error: null }
        } catch (err) {
            var regExp = /\(([^)]+)\)/;

            var error = regExp.exec(err.detail)[1].trim()

            var res = error.trim().split(",").map(e => { return { field: e.trim(), msg: e.trim() === "idnumber" ? "Este número de cedula esta registrado" : "Este teléfono esta registrado" } })

            return { success: false, data: null, errors: res }
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        try {
            return { success: await this._personService.delete(id), data: null, error: null }
        } catch (error) {
            return { success: false, data: null, error: "Debe eliminar todos los registros que tengan esta persona" }
        }
    }

}
