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
import { TicketService } from "../../domain/interface/ticket.service";
import { TicketImplRepository } from "../../infrastructure/ticketImpl.repository";
import { TicketResponseDto } from "../dto/ticketRes.dto";
import { IGenericResponse, IPaginatedRequest, IPaginatedResponse } from "src/utils/generic";
import { TicketGlpiReq } from "../dto/ticketGlpiReq.dto";
import * as https from 'https';
import * as FormData from 'form-data';
import { UserExternalImplRepository } from "src/modules/user-external/infrastructure/userExternalImpl.repository";
import { IieeImplRepository } from "src/modules/iiee/infrastructure/iieeImpl.repository";
import axios from "axios";
import { getKeyByValue } from "src/utils/functions/generic-functions";


@Injectable()
export class TicketImplService implements TicketService {
    
    constructor(private readonly ticketRepository: TicketImplRepository,
        private readonly fileRepository: FileImplRepository,
        private readonly noteRepository: NoteImplRepository,
        private readonly ticketDetailRepository: TicketDetailImplRepository,
        private readonly userExternalRepository: UserExternalImplRepository,
        private readonly iieeRepository: IieeImplRepository
        ) { }
    
    async registerNoteByTicketId(ticketId: number, note: NoteRequestDto): Promise<IGenericResponse<NoteResponseDto>> {
        try{
            const noteEntity = mapper.map(note, NoteRequestDto, NoteEntity);
            const responseNote = await this.noteRepository.createNoteByTicketId(ticketId, noteEntity);
           
            const mapNote = mapper.map(responseNote, NoteEntity, NoteResponseDto);

            const requestConfig = {
                headers: {
                    'Content-Type': 'application/json',
                },
                httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            };

            const glpiFollowup = {
                content: note.comment,
                is_private: note.isPrivate
              }

        
            const response = await axios.post(`${process.env.MSA_GLPI_URL}/tickets/${ticketId}/ITILFollowup`, glpiFollowup, requestConfig);

            if(!response.data.success){
                throw ErrorManager.createSignatureError(response.data);
            }

            return {
                success: true,
                code: HttpStatus.OK,
                data: mapNote,
                messages:[]
            }

        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    
    async registerFileByTicketId(ticketId: number, file: FileRequestDto): Promise<IGenericResponse<FileResponseDto>> {
        try{
            const fileEntity = mapper.map(file, FileRequestDto, FileEntity);
            const responseFile = await this.fileRepository.createFileByTicketId(ticketId, fileEntity);
           
            const mapFile = mapper.map(responseFile, FileEntity, FileResponseDto);

            return {
                success: true,
                code: HttpStatus.OK,
                data: mapFile,
                messages:[]
            }

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

    async findTicketById(id: number): Promise<IGenericResponse<TicketResponseDto>> {
        try {
            const responseTicket = await this.ticketRepository.findTicketById(id);
            if (!responseTicket) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Ticket with ID ${id} not found`
                })
            }
            const mapTicket = mapper.map(responseTicket, TicketEntity, TicketResponseDto);
            mapTicket.userExternalId = responseTicket.userExternal.id;
            return {
                success: true,
                code: HttpStatus.OK,
                data: mapTicket,
                messages: ['Successfully ticket found']
            };
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async listAllTickets(filter: IPaginatedRequest): Promise<IPaginatedResponse<TicketResponseDto>> {
        //const responseTickets = await this.ticketRepository.listAllTickets();

        const queryBuilder = this.ticketRepository.getOrmRepository().createQueryBuilder("ticket");

        queryBuilder
        .orderBy("ticket."+filter.sortBy, filter.sortOrder)
        .skip(Math.max(0,(filter.page - 1) * filter.size))
        .take(filter.size);

        const itemCount = await queryBuilder.getCount();
        const { entities: responseTickets} = await queryBuilder.getRawAndEntities();
       
        const tickets = responseTickets.map(responseTicket =>
            mapper.map(responseTicket, TicketEntity, TicketResponseDto)
        );

        const fullTickets = await Promise.all(
            tickets.map(async (rp) => {
              const td = await this.ticketDetailRepository.findTicketDetailByTicketId(rp.id);
              rp.ticketDetail = mapper.map(td, TicketDetailEntity, TicketDetailResponseDto);
              return rp;
            }),
        );

        return {
            page: filter.page,
            recordsTotal: itemCount,
            size: filter.size,
            success: true,
            items: fullTickets
        };
    }

    async findTicketDetailByTicketId(ticketId: number): Promise<IGenericResponse<TicketDetailResponseDto>> {
        try{
            const responseTd = await this.ticketDetailRepository.findTicketDetailByTicketId(ticketId);
            if (!responseTd) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Ticket-Detail with TicketId ${ticketId} not found`
                })
            }

            const mapTd = mapper.map(responseTd, TicketDetailEntity, TicketDetailResponseDto);

            return {
                success: true,
                code: HttpStatus.OK,
                data: mapTd,
                messages:[]
            }
        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async registerTicketDetailByTicketId(ticketId: number, ticketDetail: TicketDetailRequestDto): Promise<IGenericResponse<TicketDetailResponseDto>> {
        try{
            const ticketDetailEntity = mapper.map(ticketDetail, TicketDetailRequestDto, TicketDetailEntity);
            const responseTd = await this.ticketDetailRepository.createTicketDetailByTicketId(ticketId, ticketDetailEntity);
           
            const mapTd = mapper.map(responseTd, TicketDetailEntity, TicketDetailResponseDto);

            return {
                success: true,
                code: HttpStatus.OK,
                data: mapTd,
                messages: []
            }

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

    async sendTicketToAPIGlpi(content: TicketGlpiReq, files: Express.Multer.File[]): Promise<any> {
        try{
            const requestConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            };

            const user = await this.userExternalRepository.findUserExternalById(content.userId);
            const ticket = await this.ticketRepository.findTicketById(content.ticketId);
            const iiee = await this.iieeRepository.findIieeByModularCode(content.iieeModularCode);
            
           
            const thisForm = new FormData();
            thisForm.append('userRequest', JSON.stringify(user), { contentType: 'application/json' });
            thisForm.append('ticketDetail', JSON.stringify(ticket.ticketDetail), { contentType: 'application/json' });
            thisForm.append('ticket', JSON.stringify(ticket), { contentType: 'application/json' });
            thisForm.append('iiee', JSON.stringify(iiee), { contentType: 'application/json' });

           // console.log(files);
           //let filesToRegister

            for (let i = 0; i < files.length; i++) {
                const el = files[i];
                thisForm.append(`files`, el.buffer, el.originalname);
                //console.log(el.originalname);
            }
            //console.log(thisForm);
            const response = await axios.post(`${process.env.MSA_GLPI_URL}/tickets`, thisForm, requestConfig);

            const {messages} = response.data;

            for (let i = 0; i < messages.length; i++) {
                
                const file: FileEntity = {
                    date: new Date(),
                    name: messages[i].filename,
                    path: `${process.env.MSA_GLPI_URL}/document/${messages[i].id}/download`,
                    size: messages[i].filesize,
                    note: null,
                    ticket: null,
                    id: null
                }
                await this.fileRepository.createFileByTicketId(ticket.id,file);
                //console.log(el.originalname);
            }

            //console.log(response);
            //console.log(response)
            return response.data;
        }catch(error){
            //console.log(error);
            if (error.code == 'ECONNREFUSED'){
                throw ErrorManager.createSignatureError(`SERVICE_UNAVAILABLE :: Failed to connect to microservice 'glpi-manager' on port ${error.port}`);
            }
            
            else if (error.response?.data){
                throw ErrorManager.createSignatureError(`${getKeyByValue(HttpStatus,error.response.status)} :: ${error.response.data.message}`);
            }

            else{
                throw ErrorManager.createSignatureError(error.message)
            }

        }
    }
    
}