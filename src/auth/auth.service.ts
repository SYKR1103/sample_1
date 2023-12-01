import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { TokenPayloadInterface } from 'src/interfaces/TokenPayloadInterface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {

constructor(
  private readonly userservice : UserService,
  private readonly configService : ConfigService,
  private readonly jwtservice : JwtService
) {}

async createU(c:CreateUserDto) {
  try{
  return await this.userservice.createU(c)
  } catch(e) {
    console.log(e)
    throw new InternalServerErrorException()
  }
}

async loginU(l:LoginUserDto) {
  try{
  const user =  await this.userservice.findUserByEmail(l.email)
  const isMatched = await user.checkPassword(l.password)
  if (isMatched) return user
} catch(e) {
  console.log(e)
  throw new InternalServerErrorException()
}

}

public generateJwtAccessToken(userId : string) {

  const payload : TokenPayloadInterface = {userId}
  const token = this.jwtservice.sign(payload, {

    secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    expiresIn: `${this.configService.get(
    'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}`,


  })
  return token
}



}
