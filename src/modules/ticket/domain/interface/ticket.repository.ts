import { TicketEntity } from "../model/ticket.entity";

export interface TicketRepository {
    createTicket(ticket: TicketEntity): Promise<TicketEntity>;
    findTicketById(id: number):Promise<TicketEntity | null>;
    listAllTickets():Promise<TicketEntity[]>
}