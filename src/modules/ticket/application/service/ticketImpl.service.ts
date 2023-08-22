import { HttpStatus, Injectable } from "@nestjs/common";
import { mapper } from "src/utils/mapping/mapper";
import { TicketRequestDto } from "../dto/ticketReq.dto";
import { ErrorManager } from "src/utils/errors/error.manager";
import { FileRequestDto } from "src/modules/file/application/dto/fileReq.dto";
import { FileResponseDto } from "src/modules/file/application/dto/fileRes.dto";
import { FileEntity } from "src/modules/file/domain/model/file.entity";
import { FileImplRepository } from "src/modules/file/infrastructure/fileImpl.repository";
import { NoteRequestDto } from "src/modules/notes/application/dto/noteReq.dto";
import { NoteResponseDto } from "src/modules/notes/application/dto/noteRes.dto";
import { NoteEntity } from "src/modules/notes/domain/model/note.entity";
import { NoteImplRepository } from "src/modules/notes/infrastructure/noteImpl.repository";
import { TicketDetailRequestDto } from "src/modules/ticket-detail/application/dto/ticketDetailReq.dto";
import { TicketDetailResponseDto } from "src/modules/ticket-detail/application/dto/ticketDetailRes.dto";
import { TicketDetailEntity } from "src/modules/ticket-detail/domain/model/ticketDetail.entity";
import { TicketDetailImplRepository } from "src/modules/ticket-detail/infrastructure/ticketDetailImpl.repository";
import { TicketEntity } from "../../domain/model/ticket.entity";
import { TicketService } from "../../domain/ticket.service";
import { TicketImplRepository } from "../../infrastructure/ticketImpl.repository";
import { TicketResponseDto } from "../dto/ticketRes.dto";
import { IGenericResponse } from "src/utils/interface/generic";


@Injectable()
export class TicketImplService implements TicketService {
    
    constructor(private readonly ticketRepository: TicketImplRepository,
        private readonly fileRepository: FileImplRepository,
        private readonly noteRepository: NoteImplRepository,
        private readonly ticketDetailRepository: TicketDetailImplRepository,
        ) { }
    
    async registerNoteByTicketId(ticketId: number, note: NoteRequestDto): Promise<NoteResponseDto> {
        try{
            const noteEntity = mapper.map(note, NoteRequestDto, NoteEntity);
            const responseNote = await this.noteRepository.createNoteByTicketId(ticketId, noteEntity);
           
            return mapper.map(responseNote, NoteEntity, NoteResponseDto);

        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    
    async registerFileByTicketId(ticketId: number, file: FileRequestDto): Promise<FileResponseDto> {
        try{
            const fileEntity = mapper.map(file, FileRequestDto, FileEntity);
            const responseFile = await this.fileRepository.createFileByTicketId(ticketId, fileEntity);
           
            return mapper.map(responseFile, FileEntity, FileResponseDto);

        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async findFilesByTicketId(ticketId: number): Promise<FileResponseDto[]> {
        const responseFiles = await this.fileRepository.findFilesByTicketId(ticketId);

        const files = responseFiles.map(responseFile =>
            mapper.map(responseFile, FileEntity, FileResponseDto)
        );

        return files;
    }

    async findNotesByTicketId(ticketId: number): Promise<NoteResponseDto[]> {
        const responseNotes = await this.noteRepository.findNotesByTicketId(ticketId);

        const notes = responseNotes.map(responseFile =>
            mapper.map(responseFile, NoteEntity, NoteResponseDto)
        );

        return notes;
    }
    
    

    async registerTicket(ticket: TicketRequestDto): Promise<IGenericResponse<TicketResponseDto>> {
        try {
            const ticketEntity = mapper.map(ticket, TicketRequestDto, TicketEntity);
            const responseTicket = await this.ticketRepository.createTicket(ticketEntity);

            const mapTicket = mapper.map(responseTicket, TicketEntity, TicketResponseDto);

            return {
                success: true,
                data: mapTicket,
                code: HttpStatus.CREATED,
                messages: ['Ticket successfull registered'],
            }
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async findTicketById(id: number): Promise<TicketResponseDto> {
        try {
            const responseTicket = await this.ticketRepository.findTicketById(id);
            if (!responseTicket) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Ticket with ID ${id} not found`
                })
            }
            const ticket = mapper.map(responseTicket, TicketEntity, TicketResponseDto);
            ticket.userExternalId = responseTicket.userExternal.id;
            return ticket;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async listAllTickets(): Promise<TicketResponseDto[]> {
        const responseTickets = await this.ticketRepository.listAllTickets();

        const tickets = responseTickets.map(responseTicket =>
            mapper.map(responseTicket, TicketEntity, TicketResponseDto)
        );

        return tickets;
    }

    async findTicketDetailByTicketId(ticketId: number): Promise<TicketDetailResponseDto> {
        try{
            const responseTd = await this.ticketDetailRepository.findTicketDetailByTicketId(ticketId);
            if (!responseTd) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Ticket-Detail with TicketId ${ticketId} not found`
                })
            }
            return mapper.map(responseTd, TicketDetailEntity, TicketDetailResponseDto);
        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async registerTicketDetailByTicketId(ticketId: number, ticketDetail: TicketDetailRequestDto): Promise<TicketDetailResponseDto> {
        try{
            const ticketDetailEntity = mapper.map(ticketDetail, TicketDetailRequestDto, TicketDetailEntity);
            const responseTd = await this.ticketDetailRepository.createTicketDetailByTicketId(ticketId, ticketDetailEntity);
           
            return mapper.map(responseTd, TicketDetailEntity, TicketDetailResponseDto);

        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async deleteTicketDetailByTicketId(id: number) {
        try{
            const responseTd = await this.ticketDetailRepository.deleteTicketDetailByTicketId(id);
            if (!responseTd) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Ticket-Detail with TicketId ${id} not found`
                })
            }
           
            return mapper.map(responseTd, TicketDetailEntity, TicketDetailResponseDto);

        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async updateTicketDetailByTicketId(id: number, updateTd: TicketDetailRequestDto) {
        try{
            const ticketDetailEntity = mapper.map(updateTd, TicketDetailRequestDto, TicketDetailEntity);
            const responseTd = await this.ticketDetailRepository.updateTicketDetailByTicketId(id, ticketDetailEntity);
            if (!responseTd) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Ticket-Detail with TicketId ${id} not found`
                })
            }
           
            return mapper.map(responseTd, TicketDetailEntity, TicketDetailResponseDto);

        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }

}