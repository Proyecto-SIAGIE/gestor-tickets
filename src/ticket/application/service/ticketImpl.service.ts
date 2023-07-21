import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { TicketService } from "src/ticket/domain/ticket.service";
import { TicketResponseDto } from "../dto/ticketRes.dto";
import { TicketImplRepository } from "src/ticket/infrastructure/ticketImpl.repository";
import { mapper } from "src/utils/mapping/mapper";
import { TicketEntity } from "src/ticket/domain/model/ticket.entity";
import { TicketRequestDto } from "../dto/ticketReq.dto";
import { ErrorManager } from "src/utils/errors/error.manager";
import { UserExternalEntity } from "src/user-external/domain/model/userExternal.entity";
import { UserExternalResponseDto } from "src/user-external/application/dto/userExternalRes.dto";
import { FileRequestDto } from "src/file/application/dto/fileReq.dto";
import { FileResponseDto } from "src/file/application/dto/fileRes.dto";
import { FileImplRepository } from "src/file/infrastructure/fileImpl.repository";
import { FileEntity } from "src/file/domain/model/file.entity";
import { NoteRequestDto } from "src/notes/application/dto/noteReq.dto";
import { NoteResponseDto } from "src/notes/application/dto/noteRes.dto";
import { NoteEntity } from "src/notes/domain/model/note.entity";
import { NoteImplRepository } from "src/notes/infrastructure/noteImpl.repository";
import { TicketDetailResponseDto } from "src/ticket-detail/application/dto/ticketDetailRes.dto";
import { TicketDetailImplRepository } from "src/ticket-detail/infrastructure/ticketDetailImpl.repository";
import { TicketDetailEntity } from "src/ticket-detail/domain/model/ticketDetail.entity";
import { TicketDetailRequestDto } from "src/ticket-detail/application/dto/ticketDetailReq.dto";

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
    
    

    async registerTicket(ticket: TicketRequestDto): Promise<TicketResponseDto> {
        try {
            const ticketEntity = mapper.map(ticket, TicketRequestDto, TicketEntity);
            const responseTicket = await this.ticketRepository.createTicket(ticketEntity);

            return mapper.map(responseTicket, TicketEntity, TicketResponseDto);

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