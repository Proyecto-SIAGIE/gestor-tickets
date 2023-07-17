
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './domain/model/role.entity';
import { RoleImplService } from './application/service/roleImpl.service';
import { RoleImplRepository } from './infrastructure/roleImpl.repository';
import { RoleController } from './infrastructure/controller/role.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity])
  ],
  controllers: [RoleController],
  providers: [RoleImplService, RoleImplRepository],
})
export class RoleModule {}
