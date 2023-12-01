import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt/dist';
import { TokenPayloadInterface } from 'src/interfaces/TokenPayloadInterface';

@Injectable()
export class AuthService {

  constructor(
    private readonly userservice : UserService,
    private readonly configService : ConfigService,
    private readonly jwtservice : JwtService,
  ) {}

  //회원가입
  async createU(c:CreateUserDto) {
    try{

      return await this.userservice.createU(c)
    } catch(e) {
      console.log(e)
      throw new InternalServerErrorException()
    }
  }

  //로그인
  async loginU(l:LoginUserDto) {
    try{

      const user = await this.userservice.findUserByEmail(l.email)
      const ispwMatched = user.checkPassword(l.password)
      if (ispwMatched) return user
    
    } catch(e) {
      console.log(e)
      throw new InternalServerErrorException()
    }

  }

  public generateAccessToken(userId : string) {

    const payload : TokenPayloadInterface = {userId}
    const token = this.jwtservice.sign(payload, {

      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}`,
  })


}

}
