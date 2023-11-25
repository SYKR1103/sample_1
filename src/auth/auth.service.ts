import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { HttpException, HttpStatus} from '@nestjs/common'
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadInterface } from 'src/interfaces/TokenPayloadInterface';


@Injectable()
export class AuthService {

  constructor(
    private readonly userService : UserService,
    private readonly configService : ConfigService,
    private readonly jwtService : JwtService
  ) {}

    //회원가입
    async createUser(c:CreateUserDto) {
      try{return await this.userService.createU(c)} 
      catch(e) {
        console.log(e)
        throw new HttpException("not found", HttpStatus.INTERNAL_SERVER_ERROR)
      }
      
    }

    //로그인
    async loginUser(l:LoginUserDto) {

      try{return await this.userService.findUserByEmail(l.email)} 
      catch(e) {
        console.log(e)
        throw new HttpException("not found", HttpStatus.INTERNAL_SERVER_ERROR)
      }

    }

    //토큰 발행
    async generateJwtAccessToken(userId : string) {

      const payload : TokenPayloadInterface = {userId}
      const token = this.jwtService.sign(payload, {

        secret : this.configService.get("JWT_ACCESS_TOKEN_SECRET"),
        expiresIn : this.configService.get("JWT_ACCESS_TOKEN_EXPIRATION_TIME")


      })

      return token

    }

}
