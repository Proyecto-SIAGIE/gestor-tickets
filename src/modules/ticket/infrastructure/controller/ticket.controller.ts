
import { ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileRequestDto } from 'src/modules/file/application/dto/fileReq.dto';
import { NoteRequestDto } from 'src/modules/notes/application/dto/noteReq.dto';
import { TicketDetailRequestDto } from 'src/modules/ticket-detail/application/dto/ticketDetailReq.dto';
import { TicketImplService } from '../../application/service/ticketImpl.service';
import { IPaginatedRequest, sortOrder } from 'src/utils/generic';
import { TicketGlpiReq } from '../../application/dto/ticketGlpiReq.dto';
import { FilesInterceptor } from '@nestjs/platform-express';


@ApiTags('tickets')
@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketImplService) {}

    @ApiOperation({ summary: 'Obtener un Ticket por Id' })
    @Get(':id')
    async findOneTicketById(@Param('id',ParseIntPipe) id: number){
        return await this.ticketService.findTicketById(id);
    }

    /*@Post()
    async registerTicket(@Body() createTicket: TicketRequestDto){
        return await this.ticketService.registerTicket(createTicket);
    }*/
    @ApiOperation({ summary: 'Registrar el File de un Ticket' })
    @Post(':id/files')
    async registerFileByTicketId(@Param('id',ParseIntPipe) id: number, @Body() createFile: FileRequestDto){
        return await this.ticketService.registerFileByTicketId(id,createFile);
    }

    @ApiOperation({ summary: 'Registrar la Nota de un Ticket' })
    @Post(':id/notes')
    async registeNoteByTicketId(@Param('id',ParseIntPipe) id: number, @Body() createNote: NoteRequestDto){
        return await this.ticketService.registerNoteByTicketId(id,createNote);
    }

    @ApiOperation({ summary: 'Obtener los Files de un Ticket (ticket-id)' })
    @Get(':id/files')
    async listFilesByTicketId(@Param('id',ParseIntPipe) id: number){
        return await this.ticketService.findFilesByTicketId(id);
    }

    @ApiOperation({ summary: 'Obtener las Notas de un Ticket (ticket-id)' })
    @Get(':id/notes')
    async listNotesByTicketId(@Param('id',ParseIntPipe) id: number){
        return await this.ticketService.findNotesByTicketId(id);
    }

    @ApiOperation({ summary: 'Obtener la lista de Tickets' })
    @ApiQuery({ name: 'page', type: Number, required: true })
    @ApiQuery({ name: 'size', type: Number, required: true })
    @ApiQuery({ name: 'sortBy', type: String, required: false })
    @ApiQuery({ name: 'sortOrder', enum: sortOrder, required: false })
    @Get()
    async listAllTickets(@Query() filter: IPaginatedRequest){
        if(!filter.sortBy) filter.sortBy = 'id';
        
        return await this.ticketService.listAllTickets(filter);
    }

    @ApiOperation({ summary: 'Obtener el Ticket-Detail de un Ticket' })
    @Get(':id/ticketDetail')
    async getTicketDetailByTicketId(@Param('id',ParseIntPipe) id: number){
        return await this.ticketService.findTicketDetailByTicketId(id);
    }

    @ApiOperation({ summary: 'Registrar el Ticket-Detail de un Ticket' })
    @Post(':id/TicketDetail')
    async registerTicketDetailByTicketId(@Param('id',ParseIntPipe) id: number, @Body() createTicketDetail: TicketDetailRequestDto){
        return await this.ticketService.registerTicketDetailByTicketId(id,createTicketDetail);
    }

    @ApiOperation({ summary: 'Enviar ticket a su registro en GLPI' })
    @ApiConsumes('multipart/form-data') // Indica que se acepta la carga de archivos en la solicitud
    @ApiBody({ type: TicketGlpiReq })
    @UseInterceptors(FilesInterceptor('files'))
    @Post('TicketToGLPI')
    async registerTicketToGlpi(@Body() content: TicketGlpiReq, @UploadedFiles() files: Express.Multer.File[]){
        return await this.ticketService.sendTicketToGlpi(content, files);
    }

    @ApiOperation({ summary: 'Actualizar el Ticket-Detail de un Ticket' })
    @Patch(':id/TicketDetail')
    async updateTicketDetailById(@Param('id',ParseIntPipe) id: number, @Body() updateTd: TicketDetailRequestDto) {
        return await this.ticketService.updateTicketDetailByTicketId(id,updateTd);
    }

    @ApiOperation({ summary: 'Eliminar el Ticket-Detail de un Ticket' })
    @Delete(':id/TicketDetail')
    async deleteTicketDetailById(@Param('id',ParseIntPipe) id: number){
        return await this.ticketService.deleteTicketDetailByTicketId(id);
    }
}