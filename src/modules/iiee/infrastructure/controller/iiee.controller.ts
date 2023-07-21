/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IieeRequestDto } from '../../application/dto/iieeReq.dto';
import { IieeImplService } from '../../application/service/iieeimpl.service';


@ApiTags('iiees')
@Controller('iiees')
export class IieeController {
    constructor(private readonly iieeService: IieeImplService){}

    @Post()
    async registerIiee(@Body() createIiee: IieeRequestDto){
        return await this.iieeService.registerIiee(createIiee);
    }

    @Get(':id')
    async findOneIieeById(@Param('id',ParseIntPipe) id: number){
        return await this.iieeService.findIieeById(id);
    }

    @Get()
    async listAllIiees(){
        return await this.iieeService.listAllIiees();
    }

    @Patch(':id')
    async updateIieeById(@Param('id',ParseIntPipe) id: number, @Body() updateIiee: IieeRequestDto) {
        return await this.iieeService.updateIieeById(id,updateIiee);
    }

    @Patch(':id/tickets/:ticketId')
    async assignIEToTicket(@Param('id',ParseIntPipe) id: number, @Param('ticketId',ParseIntPipe) ticketId: number){
        return await this.iieeService.assignIieeToTicket(id,ticketId);
        //return await this.iieeService.assignIieeToTicket(id, ticketId);
    }

    @Delete(':id')
    async deleteIieeById(@Param('id',ParseIntPipe) id: number){
        return await this.iieeService.deleteIieeById(id);
    }
}
