import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from './requestWithUser';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  async createUser(@Body() c:CreateUserDto) {
    return this.authService.createUser(c);
  }

  // @Post("/login")
  // async loginUser(@Body() l:LoginUserDto) {
  //   const user = await this.authService.loginUser(l);
  //   const token = await this.authService.generateJwtAccessToken(user.id)
  //   return token
  // }

  @UseGuards(LocalAuthGuard) // await this.authService.loginUser(l) 대신함
  @Post("/login") //@Body() 대신에 @Req로 넘어감
  async loginUser(@Req() r:RequestWithUser) {
    const {user} = r // loginuser함수 및 loginuserdto 대신에 그냥 인풋
    const token = await this.authService.generateJwtAccessToken(user.id)
    return token
  }

  @UseGuards(JwtAuthGuard) //this.userService.findUserById(payload.userId) : 할당된거
  @Get()
  async getUserInfo(@Req() r:RequestWithUser) {
    return r.user
  }



}
