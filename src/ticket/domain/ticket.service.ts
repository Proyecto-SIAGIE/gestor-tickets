import { FileRequestDto } from "src/file/application/dto/fileReq.dto";
import { TicketRequestDto } from "../application/dto/ticketReq.dto";
import { TicketResponseDto } from "../application/dto/ticketRes.dto";
import { FileResponseDto } from "src/file/application/dto/fileRes.dto";
import { NoteRequestDto } from "src/notes/application/dto/noteReq.dto";
import { NoteResponseDto } from "src/notes/application/dto/noteRes.dto";
import { TicketDetailRequestDto } from "src/ticket-detail/application/dto/ticketDetailReq.dto";
import { TicketDetailResponseDto } from "src/ticket-detail/application/dto/ticketDetailRes.dto";

export interface TicketService {
    registerTicket(ticket: TicketRequestDto): Promise<TicketResponseDto>;
    findTicketById(id: number):Promise<TicketResponseDto | null>;
    listAllTickets():Promise<TicketResponseDto[]>

    registerFileByTicketId(ticketId: number, file: FileRequestDto): Promise<FileResponseDto>;
    findFilesByTicketId(ticketId: number):Promise<FileResponseDto[]>;
    findNotesByTicketId(ticketId: number):Promise<NoteResponseDto[]>;

    registerNoteByTicketId(ticketId: number, note: NoteRequestDto): Promise<NoteResponseDto>;
    
    registerTicketDetailByTicketId(ticketId: number, ticketDetail: TicketDetailRequestDto): Promise<TicketDetailResponseDto>;
    findTicketDetailByTicketId(ticketId: number): Promise<TicketDetailResponseDto>;
}