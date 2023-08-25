
import { FileRequestDto } from "src/modules/file/application/dto/fileReq.dto";
import { FileResponseDto } from "src/modules/file/application/dto/fileRes.dto";
import { NoteRequestDto } from "src/modules/notes/application/dto/noteReq.dto";
import { NoteResponseDto } from "src/modules/notes/application/dto/noteRes.dto";
import { TicketDetailRequestDto } from "src/modules/ticket-detail/application/dto/ticketDetailReq.dto";
import { TicketDetailResponseDto } from "src/modules/ticket-detail/application/dto/ticketDetailRes.dto";
import { TicketRequestDto } from "../../application/dto/ticketReq.dto";
import { TicketResponseDto } from "../../application/dto/ticketRes.dto";
import { IGenericResponse, IPaginatedRequest, IPaginatedResponse } from "src/utils/generic";
import { TicketGlpiReq } from "../../application/dto/ticketGlpiReq.dto";


export interface TicketService {
    registerTicket(ticket: TicketRequestDto): Promise<IGenericResponse<TicketResponseDto>>;
    findTicketById(id: number):Promise<IGenericResponse<TicketResponseDto>>;
    listAllTickets(filter: IPaginatedRequest):Promise<IPaginatedResponse<TicketResponseDto>>

    registerFileByTicketId(ticketId: number, file: FileRequestDto): Promise<IGenericResponse<FileResponseDto>>;
    findFilesByTicketId(ticketId: number):Promise<FileResponseDto[]>;
    findNotesByTicketId(ticketId: number):Promise<NoteResponseDto[]>;

    registerNoteByTicketId(ticketId: number, note: NoteRequestDto): Promise<IGenericResponse<NoteResponseDto>>;
    
    registerTicketDetailByTicketId(ticketId: number, ticketDetail: TicketDetailRequestDto): Promise<IGenericResponse<TicketDetailResponseDto>>;
    findTicketDetailByTicketId(ticketId: number): Promise<IGenericResponse<TicketDetailResponseDto>>;
    sendTicketToAPIGlpi(content: TicketGlpiReq, files: Express.Multer.File[]): Promise<any>;
}