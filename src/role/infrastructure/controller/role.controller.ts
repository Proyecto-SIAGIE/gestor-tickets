/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleRequestDto } from 'src/role/application/dto/roleReq.dto';
import { RoleImplService } from 'src/role/application/service/roleImpl.service';

@ApiTags('roles')
@Controller('roles')
export class RoleController {

    constructor(private readonly roleService: RoleImplService) {}

    @Get(':id')
    async findOneTicketById(@Param('id',ParseIntPipe) id: number){
        return await this.roleService.findRoleById(id);
    }

    @Post()
    async registerTicket(@Body() createRole: RoleRequestDto){
        return await this.roleService.registerRole(createRole);
    }

    @Get()
    async listAllTickets(){
        return await this.roleService.listAllRoles();
    }
}
