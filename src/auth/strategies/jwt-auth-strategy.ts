import { Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import {Injectable} from '@nestjs/common'
import { UserService } from "src/user/user.service";
import { ConfigService } from '@nestjs/config';
import { ExtractJwt} from 'passport-jwt'
import { TokenPayloadInterface } from "src/interfaces/TokenPayloadInterface";
import { User } from "src/user/entities/user.entity";


@Injectable()

export class JwtAuthStrategy extends PassportStrategy(Strategy) {


    constructor(
        private readonly userService : UserService,
        private readonly configService : ConfigService
    ) {

        super({
            
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : configService.get("JWT_ACCESS_TOKEN_SECRET")

        })


    }
    async validate(payload : TokenPayloadInterface ) : Promise<User> {
        return await this.userService.findUserById(payload.userId)
    }




}

