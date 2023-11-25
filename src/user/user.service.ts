import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { HttpException, HttpStatus} from '@nestjs/common';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepo : Repository<User>
  ) {}

    async createU(c:CreateUserDto) {
      const newuser = await this.userRepo.create(c)
      //야 저장을 안했잖아 개멍청아
      await this.userRepo.save(newuser)
      if (newuser) return newuser
      throw new HttpException("xxxx", HttpStatus.NOT_FOUND)
    }

    async findUserById(id:string) {
      const foundusesr = await this.userRepo.findOneBy({id})
      if(foundusesr) return foundusesr
      throw new HttpException("xxxx", HttpStatus.NOT_FOUND)
    }

    async findUserByEmail(email:string) {
      const foundusesr = await this.userRepo.findOneBy({email})
      if(foundusesr) return foundusesr
      throw new HttpException("xxxx", HttpStatus.NOT_FOUND)
    }
    


}
