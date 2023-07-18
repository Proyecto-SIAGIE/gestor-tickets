
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './domain/model/role.entity';
import { RoleImplService } from './application/service/roleImpl.service';
import { RoleImplRepository } from './infrastructure/roleImpl.repository';
import { RoleController } from './infrastructure/controller/role.controller';
import { UserExternalImplService } from 'src/user-external/application/service/userExternalImpl.service';
import { UserExternalImplRepository } from 'src/user-external/infrastructure/userExternalImpl.repository';
import { UserExternalEntity } from 'src/user-external/domain/model/userExternal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity]),
    TypeOrmModule.forFeature([UserExternalEntity])
  ],
  controllers: [RoleController],
  providers: [RoleImplService, 
    RoleImplRepository,
    UserExternalImplService,
    UserExternalImplRepository
    ],
})
export class RoleModule {}
