/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NoteImplService } from '../../application/service/noteimpl.service';
import { FileRequestDto } from 'src/modules/file/application/dto/fileReq.dto';
import { NoteRequestDto } from '../../application/dto/noteReq.dto';


@ApiTags('notes')
@Controller('notes')
@Controller()
export class NoteController {
    constructor(private readonly noteService: NoteImplService){}

    @ApiOperation({ summary: 'Registrar un File (archivo) para la Nota' })
    @Post(':id/files')
    async registerFileByNoteId(@Param('id',ParseIntPipe) id: number, @Body() createFile: FileRequestDto){
        return await this.noteService.registerFileByNoteId(id,createFile);
    }

    @ApiOperation({ summary: 'Obtener los Files (archivos) de una Nota' })
    @Get(':id/files')
    async findFilesByNoteId(@Param('id',ParseIntPipe) id: number){
        return await this.noteService.findFilesByNoteId(id);
    }

    @ApiOperation({ summary: 'Obtener una Nota por Id' })
    @Get(':id')
    async findOneNoteById(@Param('id',ParseIntPipe) id: number){
        return await this.noteService.findNoteById(id);
    }

    /*@ApiOperation({ summary: 'Obtener la lista de Notas' })
    @Get()
    async listAllNotes(){
        return await this.noteService.listAllNotes();
    }*/

    @ApiOperation({ summary: 'Actualizar una Nota por Id' })
    @Patch(':id')
    async updateNoteById(@Param('id',ParseIntPipe) id: number, @Body() updateNote: NoteRequestDto) {
        return await this.noteService.updateNoteById(id,updateNote);
    }

    @ApiOperation({ summary: 'Eliminar una Nota por Id' })
    @Delete(':id')
    async deleteNoteById(@Param('id',ParseIntPipe) id: number){
        return await this.noteService.deleteNoteById(id);
    }
}
