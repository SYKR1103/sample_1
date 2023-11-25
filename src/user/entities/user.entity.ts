import { BaseEntity } from "src/common/base.entity";
import { Column, BeforeInsert, Entity} from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { InternalServerErrorException } from '@nestjs/common';
import { Role } from "./role.enum";



@Entity()


export class User extends BaseEntity {



    @Column()
    public email : string

    @Column()
    public password : string

    @Column()
    public nickname : string


    @Column({

        type : "enum",
        enum : Role,
        array : true,
        default : [Role.USER]

    }) public roles : Role[]



    @BeforeInsert()
    async hashedpassword(): Promise<void>  {

        
        try{
        const saltValue = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, saltValue)
    } catch(e) {
        console.log(e)
        throw new InternalServerErrorException()
    }
    }

    async checkPassword(aPassword : string): Promise<boolean> {
        try{
        const ismatched = await bcrypt.compare(aPassword, this.password)
        return ismatched 
        } catch(e) {
            console.log(e)
            throw new InternalServerErrorException()
        }
    }


}
