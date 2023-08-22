/*
https://docs.nestjs.com/providers#services
*/

import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { RoleRequestDto } from '../dto/roleReq.dto';
import { RoleResponseDto } from '../dto/roleRes.dto';
import { mapper } from 'src/utils/mapping/mapper';
import { ErrorManager } from 'src/utils/errors/error.manager';
import { RoleEntity } from '../../domain/model/role.entity';
import { RoleService } from '../../domain/interface/role.service';
import { RoleImplRepository } from '../../infrastructure/roleImpl.repository';
import { IGenericResponse } from 'src/utils/generic';

@Injectable()
export class RoleImplService implements RoleService {
    constructor(private readonly roleRepository: RoleImplRepository) { }

    async registerRole(role: RoleRequestDto): Promise<IGenericResponse<RoleResponseDto>> {
        try {
            const roleEntity = mapper.map(role, RoleRequestDto, RoleEntity);

            const responseRole = await this.roleRepository.createRole(roleEntity);

            const mapRole = mapper.map(responseRole, RoleEntity, RoleResponseDto);
            
            return {
                success: true,
                code: HttpStatus.OK,
                data: mapRole,
                messages: []
            }

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async findRoleById(id: number): Promise<IGenericResponse<RoleResponseDto>> {
        try {
            const responseRole = await this.roleRepository.findRoleById(id);
            if (!responseRole) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Role with ID ${id} not found`
                })
            }
            
            const mapRole = mapper.map(responseRole, RoleEntity, RoleResponseDto);
            return {
                success: true,
                code: HttpStatus.OK,
                data: mapRole,
                messages: []
            }

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
