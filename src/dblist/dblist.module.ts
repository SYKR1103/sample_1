import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({

    imports : [
        TypeOrmModule.forRootAsync({
            imports : [ConfigModule],
            inject : [ConfigService],
            useFactory : (C:ConfigService) => ({
                type : 'postgres',
                host : C.get('POSTGRES_HOST'),
                port : C.get('POSTGRES_PORT'),
                username : C.get('POSTGRES_USER'),
                password : C.get('POSTGRES_PASSWORD'),
                database : C.get('POSTGRES_DB'), 
                entities : [ __dirname + "/../**/*.entity{.ts,.js}"],
                autoLoadEntities : true,
                synchronize : true
            }),
            

        })
    ]



})
export class DblistModule {}
