import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Signs } from "../entities/signs.entity";

@Injectable()
export class SignsService {
    constructor(
        @InjectRepository(Signs) private _signsRepo: Repository<Signs>,
    ) { }

    async findAll() {
        return await this._signsRepo.find();
    }

   
}
