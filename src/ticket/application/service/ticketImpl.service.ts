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

@Injectable()
export class TicketImplService implements TicketService {
    constructor(private readonly ticketRepository: TicketImplRepository) { }

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

}