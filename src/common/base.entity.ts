import {PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn} from "typeorm"
import {Column, Entity} from 'typeorm'



@Entity()

export abstract class BaseEntity {


    @PrimaryGeneratedColumn('uuid')
    public id : string;

    @CreateDateColumn()
    public createdAt : Date;

    @UpdateDateColumn()
    public updatedAt : Date; 

}


