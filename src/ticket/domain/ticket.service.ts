import { TicketRequestDto } from "../application/dto/ticketReq.dto";
import { TicketResponseDto } from "../application/dto/ticketRes.dto";

export interface TicketService {
    registerTicket(ticket: TicketRequestDto): Promise<TicketResponseDto>;
    findTicketById(id: number):Promise<TicketResponseDto | null>;
    listAllTickets():Promise<TicketResponseDto[]>
}