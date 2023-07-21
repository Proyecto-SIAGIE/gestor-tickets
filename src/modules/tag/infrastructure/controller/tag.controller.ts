/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TagImplService } from '../../application/service/tagImpl.service';
import { TagRequestDto } from '../../application/dto/tagReq.dto';

@ApiTags('tags')
@Controller('tags')
export class TagController { 
    constructor(private readonly tagService: TagImplService){}

    @Post()
    async registerTag(@Body() createTag: TagRequestDto){
        return await this.tagService.registerTag(createTag);
    }

    @Patch(':id')
    async updateTagById(@Param('id', ParseIntPipe) id: number, @Body() tag: TagRequestDto){
        return await this.tagService.updateTagById(id,tag);
    }

    @Delete(':id')
    async deleteTagById(@Param('id', ParseIntPipe) id: number){
        return await this.tagService.deleteTagById(id);
    }

    @Get()
    async listAllTags(){
        return await this.tagService.listAllTags();
    }

    @Get(':id')
    async findTagById(@Param('id', ParseIntPipe) id: number){
        return await this.tagService.findTagById(id);
    }

    @Get(':id/tickets')
    async findTicketsByTagId(@Param('id', ParseIntPipe) id: number){
        return await this.tagService.findTicketsByTagId(id);
    }

    @Patch(':id/ticketDetails/:ticketDetailId')
    async assignTagToTicketDetail(@Param('id', ParseIntPipe) id: number, @Param('ticketDetailId', ParseIntPipe) ticketDetailId: number){
        return await this.tagService.assignTagToTicketDetail(id,ticketDetailId);
    }
}
