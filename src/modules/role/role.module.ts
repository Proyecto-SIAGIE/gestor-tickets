
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './domain/model/role.entity';
import { RoleImplService } from './application/service/roleImpl.service';
import { RoleImplRepository } from './infrastructure/roleImpl.repository';
import { RoleController } from './infrastructure/controller/role.controller';
import { UserExternalEntity } from '../user-external/domain/model/userExternal.entity';
import { TicketEntity } from '../ticket/domain/model/ticket.entity';
import { UserExternalImplService } from '../user-external/application/service/userExternalImpl.service';
import { UserExternalImplRepository } from '../user-external/infrastructure/userExternalImpl.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity]),
    TypeOrmModule.forFeature([UserExternalEntity]),
    TypeOrmModule.forFeature([TicketEntity])
  ],
  controllers: [RoleController],
  providers: [RoleImplService, 
    RoleImplRepository,
    UserExternalImplService,
    UserExternalImplRepository
    ],
})
export class RoleModule {}
