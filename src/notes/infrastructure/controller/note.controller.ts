/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileRequestDto } from 'src/file/application/dto/fileReq.dto';
import { NoteRequestDto } from 'src/notes/application/dto/noteReq.dto';
import { NoteImplService } from 'src/notes/application/service/noteimpl.service';

@ApiTags('notes')
@Controller('notes')
@Controller()
export class NoteController {
    constructor(private readonly noteService: NoteImplService){}

    @Post(':id/files')
    async registerFileByNoteId(@Param('id',ParseIntPipe) id: number, @Body() createFile: FileRequestDto){
        return await this.noteService.registerFileByNoteId(id,createFile);
    }

    @Get(':id/files')
    async findFilesByNoteId(@Param('id',ParseIntPipe) id: number){
        return await this.noteService.findFilesByNoteId(id);
    }

    @Get(':id')
    async findOneNoteById(@Param('id',ParseIntPipe) id: number){
        return await this.noteService.findNoteById(id);
    }

    @Get()
    async listAllNotes(){
        return await this.noteService.listAllNotes();
    }

    @Patch(':id')
    async updateNoteById(@Param('id',ParseIntPipe) id: number, @Body() updateNote: NoteRequestDto) {
        return await this.noteService.updateNoteById(id,updateNote);
    }

    @Delete(':id')
    async deleteNoteById(@Param('id',ParseIntPipe) id: number){
        return await this.noteService.deleteNoteById(id);
    }
}
