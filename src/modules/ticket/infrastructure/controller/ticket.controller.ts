
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { FileRequestDto } from 'src/modules/file/application/dto/fileReq.dto';
import { NoteRequestDto } from 'src/modules/notes/application/dto/noteReq.dto';
import { TicketDetailRequestDto } from 'src/modules/ticket-detail/application/dto/ticketDetailReq.dto';
import { TicketImplService } from '../../application/service/ticketImpl.service';


@ApiTags('tickets')
@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketImplService) {}

    @Get(':id')
    async findOneTicketById(@Param('id',ParseIntPipe) id: number){
        return await this.ticketService.findTicketById(id);
    }

    /*@Post()
    async registerTicket(@Body() createTicket: TicketRequestDto){
        return await this.ticketService.registerTicket(createTicket);
    }*/

    @Post(':id/files')
    async registerFileByTicketId(@Param('id',ParseIntPipe) id: number, @Body() createFile: FileRequestDto){
        return await this.ticketService.registerFileByTicketId(id,createFile);
    }

    @Post(':id/notes')
    async registeNoteByTicketId(@Param('id',ParseIntPipe) id: number, @Body() createNote: NoteRequestDto){
        return await this.ticketService.registerNoteByTicketId(id,createNote);
    }

    @Get(':id/files')
    async listFilesByTicketId(@Param('id',ParseIntPipe) id: number){
        return await this.ticketService.findFilesByTicketId(id);
    }

    @Get(':id/notes')
    async listNotesByTicketId(@Param('id',ParseIntPipe) id: number){
        return await this.ticketService.findNotesByTicketId(id);
    }

    @Get()
    async listAllTickets(){
        return await this.ticketService.listAllTickets();
    }

    @Get(':id/ticketDetail')
    async getTicketDetailByTicketId(@Param('id',ParseIntPipe) id: number){
        return await this.ticketService.findTicketDetailByTicketId(id);
    }

    @Post(':id/TicketDetail')
    async registerTicketDetailByTicketId(@Param('id',ParseIntPipe) id: number, @Body() createTicketDetail: TicketDetailRequestDto){
        return await this.ticketService.registerTicketDetailByTicketId(id,createTicketDetail);
    }

    @Patch(':id/TicketDetail')
    async updateTicketDetailById(@Param('id',ParseIntPipe) id: number, @Body() updateTd: TicketDetailRequestDto) {
        return await this.ticketService.updateTicketDetailByTicketId(id,updateTd);
    }

    @Delete(':id/TicketDetail')
    async deleteTicketDetailById(@Param('id',ParseIntPipe) id: number){
        return await this.ticketService.deleteTicketDetailByTicketId(id);
    }
}