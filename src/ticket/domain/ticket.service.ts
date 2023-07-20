import { FileRequestDto } from "src/file/application/dto/fileReq.dto";
import { TicketRequestDto } from "../application/dto/ticketReq.dto";
import { TicketResponseDto } from "../application/dto/ticketRes.dto";
import { FileResponseDto } from "src/file/application/dto/fileRes.dto";

export interface TicketService {
    registerTicket(ticket: TicketRequestDto): Promise<TicketResponseDto>;
    findTicketById(id: number):Promise<TicketResponseDto | null>;
    listAllTickets():Promise<TicketResponseDto[]>

    registerFileByTicketId(ticketId: number, file: FileRequestDto): Promise<FileResponseDto>;
    findFilesByTicketId(ticketId: number):Promise<FileResponseDto[]>;

    registerFileByNoteId(noteId: number, file: FileRequestDto): Promise<FileResponseDto>;
}