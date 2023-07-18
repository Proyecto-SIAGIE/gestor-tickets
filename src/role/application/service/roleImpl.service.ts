/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { RoleService } from 'src/role/domain/role.service';
import { RoleRequestDto } from '../dto/roleReq.dto';
import { RoleResponseDto } from '../dto/roleRes.dto';
import { RoleImplRepository } from 'src/role/infrastructure/roleImpl.repository';
import { mapper } from 'src/utils/mapping/mapper';
import { RoleEntity } from 'src/role/domain/model/role.entity';
import { ErrorManager } from 'src/utils/errors/error.manager';

@Injectable()
export class RoleImplService implements RoleService {
    constructor(private readonly roleRepository: RoleImplRepository) { }

    async registerRole(role: RoleRequestDto): Promise<RoleResponseDto> {
        try {
            const roleEntity = mapper.map(role, RoleRequestDto, RoleEntity);

            const responseRole = await this.roleRepository.createRole(roleEntity);

            return mapper.map(responseRole, RoleEntity, RoleResponseDto);

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async findRoleById(id: number): Promise<RoleResponseDto> {
        try {
            const responseRole = await this.roleRepository.findRoleById(id);
            if (!responseRole) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Role with ID ${id} not found`
                })
            }
            return mapper.map(responseRole, RoleEntity, RoleResponseDto);

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async listAllRoles(): Promise<RoleResponseDto[]> {

        const responseRoles = await this.roleRepository.listAllRoles();

        const roles = responseRoles.map(responseRole =>
            mapper.map(responseRole, RoleEntity, RoleResponseDto)
        );

        return roles;
    }
}
