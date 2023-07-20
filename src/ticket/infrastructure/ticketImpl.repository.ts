import { Injectable } from "@nestjs/common";
import { TicketEntity } from "../domain/model/ticket.entity";
import { TicketRepository } from "../domain/ticket.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IieeEntity } from "src/iiee/domain/model/iiee.entity";
import { ErrorManager } from "src/utils/errors/error.manager";


@Injectable()
export class TicketImplRepository implements TicketRepository {
    
    constructor(
        @InjectRepository(TicketEntity)
        private readonly ticketOrmRepository: Repository<TicketEntity>,
        @InjectRepository(IieeEntity)
        private readonly iieeOrmRepository: Repository<IieeEntity>
        ) { }

    async createTicket(ticket: TicketEntity): Promise<TicketEntity> {

        const ticketPreload = this.ticketOrmRepository.create(ticket);
        const resultTicket = await this.ticketOrmRepository.save(ticketPreload);
        return resultTicket;
    }

    async findTicketById(id: number): Promise<TicketEntity> {
        const ticket = await this.ticketOrmRepository.findOne({where: {id: id}, relations:['userExternal']});
        return ticket;
    }

    async listAllTickets(): Promise<TicketEntity[]> {
        const tickets = await this.ticketOrmRepository.find();
        return tickets;
    }

    async assignIieeToTicket(iieeId: number, ticketId: number) {
        const ticket = await this.ticketOrmRepository.findOneBy({id: ticketId});
        if (!ticket) return null;

        const iiee = await this.iieeOrmRepository.findOneBy({id: iieeId});
        if(!iiee) throw new ErrorManager({
            type: 'NOT_FOUND',
            message: `IIEE with Id ${iieeId} not found`
        })

        const ticketPreload = await this.ticketOrmRepository.preload({
            id: ticket.id,
            iiee: iiee,
            ...ticket
        });
        const ticketUpdated = await this.ticketOrmRepository.save(ticketPreload);
        return ticketUpdated;
    }

}