import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from './interfaces/requestWithUser';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  async createU(@Body() c:CreateUserDto) {
    return  await this.authService.createU(c);
  }


  @UseGuards(LocalAuthGuard)
  @Post("/login")
  //async loginU(@Body() l:LoginUserDto) {
  async loginU(@Req() r:RequestWithUser) {
    //const user = await this.authService.loginU(l);
    const {user} = r
    const token = await this.authService.generateJwtAccessToken(user.id)
    return {user, token}
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getinfo(@Req() r:RequestWithUser) {
    r.user
  }
  }


