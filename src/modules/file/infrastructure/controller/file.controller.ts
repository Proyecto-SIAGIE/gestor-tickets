/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileRequestDto } from '../../application/dto/fileReq.dto';
import { FileImplService } from '../../application/service/fileimpl.service';

@ApiTags('files')
@Controller('files')
export class FileController {
    constructor(private readonly fileService: FileImplService){}

    @Get(':id')
    async findOneFileById(@Param('id',ParseIntPipe) id: number){
        return await this.fileService.findFileById(id);
    }

    @Get()
    async listAllFiles(){
        return await this.fileService.listAllFiles();
    }

    @Patch(':id')
    async updateFileById(@Param('id',ParseIntPipe) id: number, @Body() updateFile: FileRequestDto) {
        return await this.fileService.updateFileById(id,updateFile);
    }

    @Delete(':id')
    async deleteFileById(@Param('id',ParseIntPipe) id: number){
        return await this.fileService.deleteFileById(id);
    }

}
