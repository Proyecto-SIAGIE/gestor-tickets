/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mssql',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            extra: {
                instanceName: 'MSSQL' //quitar
            },
            autoLoadEntities: true,
            synchronize: true,
            options: {
                trustServerCertificate: true,
            },
            connectionTimeout: +process.env.DB_CONNECTION_TIMEOUT,
            //connectTimeout: +process.env.DB_CONNECTION_TIMEOUT,
        }),
    ],
    controllers: [],
    providers: [],
})
export class DatabaseModule {}
