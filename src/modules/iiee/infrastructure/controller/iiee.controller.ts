/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IieeRequestDto } from '../../application/dto/iieeReq.dto';
import { IieeImplService } from '../../application/service/iieeimpl.service';


@ApiTags('iiees')
@Controller('iiees')
export class IieeController {
    constructor(private readonly iieeService: IieeImplService){}

    @ApiOperation({ summary: 'Registrar una IIEE' })
    @Post()
    async registerIiee(@Body() createIiee: IieeRequestDto){
        return await this.iieeService.registerIiee(createIiee);
    }

    @ApiOperation({ summary: 'Obtener una IIEE por Id' })
    @Get(':id')
    async findOneIieeById(@Param('id',ParseIntPipe) id: number){
        return await this.iieeService.findIieeById(id);
    }

    @ApiOperation({ summary: 'Obtener la lista de IIEE' })
    @Get()
    async listAllIiees(){
        return await this.iieeService.listAllIiees();
    }

    @ApiOperation({ summary: 'Actualizar una IIEE por Id' })
    @Patch(':id')
    async updateIieeById(@Param('id',ParseIntPipe) id: number, @Body() updateIiee: IieeRequestDto) {
        return await this.iieeService.updateIieeById(id,updateIiee);
    }

    @ApiOperation({ summary: 'Asignar una IIEE a un Ticket' })
    @Patch(':id/tickets/:ticketId')
    async assignIEToTicket(@Param('id',ParseIntPipe) id: number, @Param('ticketId',ParseIntPipe) ticketId: number){
        return await this.iieeService.assignIieeToTicket(id,ticketId);
        //return await this.iieeService.assignIieeToTicket(id, ticketId);
    }

    @ApiOperation({ summary: 'Eliminar una IIEE por Id' })
    @Delete(':id')
    async deleteIieeById(@Param('id',ParseIntPipe) id: number){
        return await this.iieeService.deleteIieeById(id);
    }
}
