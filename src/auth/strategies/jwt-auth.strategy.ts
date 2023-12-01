


import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";
import { ExtractJwt } from "passport-jwt";
import { TokenPayloadInterface } from "src/interfaces/TokenPayloadInterface";
import { User } from "src/user/entities/user.entity";






@Injectable()

export class JwtAuthStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly configservice : ConfigService,
        private readonly userservice : UserService
    ) {

        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : configservice.get("JWT_ACCESS_TOKEN_SECRET")  
        })

    }

    async validate(payload : TokenPayloadInterface) : Promise<User> {
        return await this.userservice.findUserById(payload.userId)
    }
}
