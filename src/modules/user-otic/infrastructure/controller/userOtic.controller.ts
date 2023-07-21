/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserOticRequestDto } from '../../application/dto/userOticReq.dto';
import { UserOticImplService } from '../../application/service/userOticImpl.service';


@ApiTags('user-otic')
@Controller('user-otic')
export class UserOticController {
    constructor(private readonly userService: UserOticImplService){}

    @ApiOperation({ summary: 'Obtener una User-Otic por Id' })
    @Get(':id')
    async findOneUserById(@Param('id',ParseIntPipe) id: number){
        return await this.userService.findUserOticById(id);
    }

    @ApiOperation({ summary: 'Registrar un User-Otic' })
    @Post()
    async registerUser(@Body() createUser: UserOticRequestDto){
        return await this.userService.registerUserOtic(createUser);
    }

    @ApiOperation({ summary: 'Obtener la lista de User-Otic' })
    @Get()
    async listAllTickets(){
        return await this.userService.listAllUserOtics();
    }

    @ApiOperation({ summary: 'Actualizar una User-Otic por Id' })
    @Patch(':id')
    async updateUserExternalById(@Param('id',ParseIntPipe) id: number, @Body() updateUser: UserOticRequestDto) {
        return await this.userService.updateUserOticById(id,updateUser);
    }

    @ApiOperation({ summary: 'Eliminar una User-Otic por Id' })
    @Delete(':id')
    async deleteUserExtenalById(@Param('id',ParseIntPipe) id: number){
        return await this.userService.deleteUserOticById(id);
    }
}
