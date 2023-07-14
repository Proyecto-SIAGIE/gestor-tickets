import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { TicketService } from "src/ticket/domain/ticket.service";
import { TicketResponseDto } from "../dto/ticketRes.dto";
import { TicketImplRepository } from "src/ticket/infrastructure/ticketImpl.repository";
import { mapper } from "src/utils/mapping/mapper";
import { TicketEntity } from "src/ticket/domain/model/ticket.entity";
import { TicketRequestDto } from "../dto/ticketReq.dto";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";

@Injectable()
export class TicketImplService implements TicketService {
    constructor(private readonly ticketRepository: TicketImplRepository) { }

    async registerTicket(ticket: TicketRequestDto): Promise<TicketResponseDto> {
        try {
            const ticketEntity = mapper.map(ticket, TicketRequestDto, TicketEntity);
            const responseTicket = await this.ticketRepository.createTicket(ticketEntity);

            return mapper.map(responseTicket, TicketEntity, TicketResponseDto);

        } catch (error) {
            throw new ExceptionsHandler(error);
        }
    }

    async findTicketById(id: number): Promise<TicketResponseDto> {
        try {

            const responseTicket = await this.ticketRepository.findTicketById(id);
            if (!responseTicket) {
                const notFoundError = new Error(`Ticket with ID ${id} not found`);
                notFoundError.name = 'NotFoundError';
                throw notFoundError;
            }

            return mapper.map(responseTicket, TicketEntity, TicketResponseDto);

        } catch (error) {
            if (error.name === 'NotFoundError') {
                throw new NotFoundException(error.message);
            } else {
                throw new InternalServerErrorException(error.message);
            }
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