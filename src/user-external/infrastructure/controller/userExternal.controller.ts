/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TicketRequestDto } from 'src/ticket/application/dto/ticketReq.dto';
import { UserExternalRequestDto } from 'src/user-external/application/dto/userExternalReq.dto';
import { UserExternalImplService } from 'src/user-external/application/service/userExternalImpl.service';

@ApiTags('user-externals')
@Controller('user-externals')
@Controller()
export class UserExternalController {
    constructor(private readonly userService: UserExternalImplService){}

    @Get(':id')
    async findOneUserById(@Param('id',ParseIntPipe) id: number){
        return await this.userService.findUserExternalById(id);
    }

    @Post()
    async registerUser(@Body() createUser: UserExternalRequestDto){
        return await this.userService.registerUserExternal(createUser);
    }

    @Post(':id/tickets')
    async createTicketByUserId(@Param('id',ParseIntPipe) id: number, @Body() createTicket: TicketRequestDto){
        return await this.userService.createTicketByRequesterUserId(id,createTicket);
    }

    @Get()
    async listAllTickets(){
        return await this.userService.listAllUserExternals();
    }

    @Patch(':id')
    async updateUserExternalById(@Param('id',ParseIntPipe) id: number, @Body() updateUser: UserExternalRequestDto) {
        return await this.userService.updateUserExternalById(id,updateUser);
    }

    @Delete(':id')
    async deleteUserExtenalById(@Param('id',ParseIntPipe) id: number){
        return await this.userService.deleteUserExtenalById(id);
    }

}
