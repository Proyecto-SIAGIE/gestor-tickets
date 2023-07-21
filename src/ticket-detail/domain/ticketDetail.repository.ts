import { TicketDetailEntity } from "./model/ticketDetail.entity";

export interface TicketDetailRepository {
    createTicketDetailByTicketId(ticketId: number, ticketDetail: TicketDetailEntity): Promise<TicketDetailEntity>;
    updateTicketDetailByTicketId(ticketId: number, tdUpdate: TicketDetailEntity): Promise<TicketDetailEntity>;
    deleteTicketDetailByTicketId(ticketId: number): Promise<TicketDetailEntity>;

    updateTicketDetailById(id: number, tdUpdate: TicketDetailEntity): Promise<TicketDetailEntity>;
    deleteTicketDetailById(id: number): Promise<TicketDetailEntity>;
    findTicketDetailByTicketId(ticketId: number): Promise<TicketDetailEntity>;
}