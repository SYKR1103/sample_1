import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport/dist";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";
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