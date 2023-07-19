/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserOticRequestDto } from 'src/user-otic/application/dto/userOticReq.dto';
import { UserOticImplService } from 'src/user-otic/application/service/userOticImpl.service';

@ApiTags('user-otic')
@Controller('user-otic')
export class UserOticController {
    constructor(private readonly userService: UserOticImplService){}

    @Get(':id')
    async findOneUserById(@Param('id',ParseIntPipe) id: number){
        return await this.userService.findUserOticById(id);
    }

    @Post()
    async registerUser(@Body() createUser: UserOticRequestDto){
        return await this.userService.registerUserOtic(createUser);
    }

    @Get()
    async listAllTickets(){
        return await this.userService.listAllUserOtics();
    }

    @Patch(':id')
    async updateUserExternalById(@Param('id',ParseIntPipe) id: number, @Body() updateUser: UserOticRequestDto) {
        return await this.userService.updateUserOticById(id,updateUser);
    }

    @Delete(':id')
    async deleteUserExtenalById(@Param('id',ParseIntPipe) id: number){
        return await this.userService.deleteUserOticById(id);
    }
}
