/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TagImplService } from '../../application/service/tagImpl.service';
import { TagRequestDto } from '../../application/dto/tagReq.dto';
import { IPaginatedRequest } from 'src/utils/generic';

@ApiTags('tags')
@Controller('tags')
export class TagController { 
    constructor(private readonly tagService: TagImplService){}

    @ApiOperation({ summary: 'Registrar un Tag' })
    @Post()
    async registerTag(@Body() createTag: TagRequestDto){
        return await this.tagService.registerTag(createTag);
    }

    @ApiOperation({ summary: 'Actualizar un Tag por Id' })
    @Patch(':id')
    async updateTagById(@Param('id', ParseIntPipe) id: number, @Body() tag: TagRequestDto){
        return await this.tagService.updateTagById(id,tag);
    }

    @ApiOperation({ summary: 'Eliminar un Tag por Id' })
    @Delete(':id')
    async deleteTagById(@Param('id', ParseIntPipe) id: number){
        return await this.tagService.deleteTagById(id);
    }

    @ApiOperation({ summary: 'Obtener toda la lista de Tags' })
    @Get()
    async listAllTags(){
        return await this.tagService.listAllTags();
    }

    @ApiOperation({ summary: 'Obtener un Tag por Id' })
    @Get(':id')
    async findTagById(@Param('id', ParseIntPipe) id: number){
        return await this.tagService.findTagById(id);
    }

    @ApiOperation({ summary: 'Obtener los tickets asociados a un Tag (tag_id)' })
    @Get(':id/tickets')
    async findTicketsByTagId(@Param('id', ParseIntPipe) id: number, @Query() filter: IPaginatedRequest ){
        return await this.tagService.findTicketsByTagId(id, filter);
    }

    @ApiOperation({ summary: 'Asignar un Tag a un Ticket' })
    @Patch(':id/ticketDetails/:ticketDetailId')
    async assignTagToTicketDetail(@Param('id', ParseIntPipe) id: number, @Param('ticketDetailId', ParseIntPipe) ticketDetailId: number){
        return await this.tagService.assignTagToTicketDetail(id,ticketDetailId);
    }
}
