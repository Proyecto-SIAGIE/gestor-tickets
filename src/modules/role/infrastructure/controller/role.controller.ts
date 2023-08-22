/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserExternalImplService } from 'src/modules/user-external/application/service/userExternalImpl.service';
import { RoleRequestDto } from '../../application/dto/roleReq.dto';
import { RoleImplService } from '../../application/service/roleImpl.service';
import { IPaginatedRequest, sortOrder } from 'src/utils/interface/generic';


@ApiTags('roles')
@Controller('roles')
export class RoleController {

    constructor(private readonly roleService: RoleImplService,
        private readonly userExternalService: UserExternalImplService) { }

    @ApiOperation({ summary: 'Obtener un Rol por Id' })
    @Get(':id')
    async findOneRoleById(@Param('id', ParseIntPipe) id: number) {
        return await this.roleService.findRoleById(id);
    }

    @ApiOperation({ summary: 'Registrar un Rol' })
    @Post()
    async registerRole(@Body() createRole: RoleRequestDto) {
        return await this.roleService.registerRole(createRole);
    }

    @ApiOperation({ summary: 'Asignar un Rol a un User-External' })
    @Patch(':id/user-externals/:userId')
    async assignRoleToUserExternal(@Param('id', ParseIntPipe) id: number, @Param('userId', ParseIntPipe) userId: number) {
        return await this.userExternalService.assignRoleToUserExternal(id, userId);
    }

    @ApiOperation({ summary: 'Desasignar un Rol de un User-External' })
    @Delete(':id/user-externals/:userId')
    async unassignRoleToUserExternal(@Param('id', ParseIntPipe) id: number, @Param('userId', ParseIntPipe) userId: number) {
        return await this.userExternalService.unassignRoleToUserExternal(id, userId);
    }

    @ApiOperation({ summary: 'Obtener la lista de User-Externals por Role Id' })
    @ApiQuery({ name: 'page', type: Number, required: true })
    @ApiQuery({ name: 'size', type: Number, required: true })
    @ApiQuery({ name: 'sortBy', type: String, required: true })
    @ApiQuery({ name: 'sortOrder', enum: sortOrder, required: false })
    @Get(':id/user-externals')
    async listAllUsersByRoleId(@Param('id', ParseIntPipe) id: number, @Query() filter: IPaginatedRequest) {
        return await this.userExternalService.listUserExternalsByRoleId(id, filter);
    }

    @ApiOperation({ summary: 'Obtener la lista de Roles' })
    @Get()
    async listAllRoles() {
        return await this.roleService.listAllRoles();
    }
}
