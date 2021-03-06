

export class UsersDto {
    id?: number
    code: string;
    email: string;
    password: string;
    person_id: number
    creationAt?: Date;
    updateAt?: Date;
    deleteAt?: Date;
    actived : boolean
}

export class UsersEmployeeDto {
    id?: number
    code: string;
    email: string;
    password: string;
    person_id: number

    
    kind_id: number
    idnumber: string
    name: string
    second_name: string
    first_surname: string
    second_surname: string
    fullname: string
    address: string
    phone: string
    contact: string
    status: boolean
    user_id: number
    classificationpeople_id : number
  
}