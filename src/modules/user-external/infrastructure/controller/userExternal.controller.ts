/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TicketRequestDto } from 'src/modules/ticket/application/dto/ticketReq.dto';
import { UserExternalRequestDto } from '../../application/dto/userExternalReq.dto';
import { UserExternalImplService } from '../../application/service/userExternalImpl.service';
import { IPaginatedRequest, sortOrder} from 'src/utils/generic';


@ApiTags('user-externals')
@Controller('user-externals')
export class UserExternalController {
    constructor(private readonly userService: UserExternalImplService){}

    @ApiOperation({ summary: 'Obtener un User-External por Id' })
    @Get(':id')
    async findOneUserById(@Param('id',ParseIntPipe) id: number){
        return await this.userService.findUserExternalById(id);
    }

    @ApiOperation({ summary: 'Registrar un User-External' })
    @Post()
    async registerUser(@Body() createUser: UserExternalRequestDto){
        return await this.userService.registerUserExternal(createUser);
    }

    @ApiOperation({ summary: 'Registrar un Ticket por User-External Id' })
    @Post(':id/tickets')
    async createTicketByUserId(@Param('id',ParseIntPipe) id: number, @Body() createTicket: TicketRequestDto){
        //const glpiTicket = await this.glpiService.registerTicketWithoutFiles(createTicket)
        return await this.userService.createTicketByRequesterUserId(id,createTicket);
    }

    /*@ApiOperation({ summary: 'Obtener la lista de User-Externals' })
    @ApiQuery({ name: 'page', type: Number, required: true })
    @ApiQuery({ name: 'size', type: Number, required: true })
    @ApiQuery({ name: 'sortBy', type: String, required: true })
    @ApiQuery({ name: 'sortOrder', enum: sortOrder, required: false })
    @Get()
    async listAllUserExternals(@Query() filter: IPaginatedRequest){
        return await this.userService.listAllUserExternals(filter);
    }*/

    @ApiOperation({ summary: 'Actualizar un User-External por Id' })
    @Patch(':id')
    async updateUserExternalById(@Param('id',ParseIntPipe) id: number, @Body() updateUser: UserExternalRequestDto) {
        return await this.userService.updateUserExternalById(id,updateUser);
    }

    @ApiOperation({ summary: 'Eliminar un User-External por Id' })
    @Delete(':id')
    async deleteUserExtenalById(@Param('id',ParseIntPipe) id: number){
        return await this.userService.deleteUserExtenalById(id);
    }

}
