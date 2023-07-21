/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UserOticController } from './infrastructure/controller/userOtic.controller';
import { UserOticImplService } from './application/service/userOticImpl.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOticEntity } from './domain/model/userOtic.entity';
import { UserOticImplRepository } from './infrastructure/userOticImpl.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserOticEntity]),
    ],
    controllers: [UserOticController],
    providers: [UserOticImplService, UserOticImplRepository],
})
export class UserOticModule {}
