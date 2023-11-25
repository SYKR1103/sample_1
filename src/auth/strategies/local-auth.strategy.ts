import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { User } from "src/user/entities/user.entity";
import { Injectable } from "@nestjs/common";





@Injectable()

export class LocalAuthStrategy extends PassportStrategy(Strategy) {


    constructor(
        private authservice : AuthService
    ) {

        super({
            usernameField : 'email'
        })

    }

    // validate 함수 : authservice에 서술된 loginUser함수대로, loginuserdto의 email-password쌍을 넣어서
    async validate(email:string, password:string) : Promise<User> {


        return await this.authservice.loginUser({email,password})

    }



}