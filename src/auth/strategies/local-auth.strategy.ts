import { PassportSerializer } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport/dist";
import { AuthService } from "../auth.service";






@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {

    constructor(
        private authservice : AuthService
    ) {

        super({

            usernameField : 'email'

        })


    }

    async validate(email:string, password:string) {
        return await this.authservice.loginU({email, password})
    }

}