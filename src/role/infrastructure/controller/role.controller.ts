/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleRequestDto } from 'src/role/application/dto/roleReq.dto';
import { RoleImplService } from 'src/role/application/service/roleImpl.service';
import { UserExternalImplService } from 'src/user-external/application/service/userExternalImpl.service';

@ApiTags('roles')
@Controller('roles')
export class RoleController {

    constructor(private readonly roleService: RoleImplService,
        private readonly userExternalService: UserExternalImplService) { }

    @Get(':id')
    async findOneRoleById(@Param('id', ParseIntPipe) id: number) {
        return await this.roleService.findRoleById(id);
    }

    @Post()
    async registerRole(@Body() createRole: RoleRequestDto) {
        return await this.roleService.registerRole(createRole);
    }

    @Patch(':id/user-externals/:userId')
    async assignRoleToUserExternal(@Param('id', ParseIntPipe) id: number, @Param('userId', ParseIntPipe) userId: number) {
        return await this.userExternalService.assignRoleToUserExternal(id, userId);
    }

    @Delete(':id/user-externals/:userId')
    async unassignRoleToUserExternal(@Param('id', ParseIntPipe) id: number, @Param('userId', ParseIntPipe) userId: number) {
        return await this.userExternalService.unassignRoleToUserExternal(id, userId);
    }

    @Get(':id/user-externals')
    async listAllUsersByRoleId(@Param('id', ParseIntPipe) id: number){
        return await this.userExternalService.listUserExternalsByRoleId(id);
    }

    @Get()
    async listAllTickets() {
        return await this.roleService.listAllRoles();
    }
}
