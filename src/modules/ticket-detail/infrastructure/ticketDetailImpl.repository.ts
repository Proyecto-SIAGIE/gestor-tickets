import { InjectRepository } from '@nestjs/typeorm';
import { TicketDetailRepository } from '../domain/ticketDetail.repository';
import { TicketDetailEntity } from '../domain/model/ticketDetail.entity';
import { Repository } from 'typeorm';
import { ErrorManager } from 'src/utils/errors/error.manager';
import { TicketEntity } from 'src/modules/ticket/domain/model/ticket.entity';

export class TicketDetailImplRepository implements TicketDetailRepository {
  constructor(
    @InjectRepository(TicketDetailEntity)
    private readonly ticketDetailOrmRepository: Repository<TicketDetailEntity>,
    @InjectRepository(TicketEntity)
    private readonly ticketOrmRepository: Repository<TicketEntity>,
  ) {}

  
  async createTicketDetailByTicketId(ticketId: number, ticketDetail: TicketDetailEntity): Promise<TicketDetailEntity> {
      const ticket = await this.ticketOrmRepository.findOneBy({id: ticketId});
      if(!ticket){
          throw new ErrorManager({
              type: 'NOT_FOUND',
              message: `Ticket with Id ${ticketId} not found`
          })
      }
      ticketDetail.ticket = ticket;
      const ticketDetailPreload = this.ticketDetailOrmRepository.create(ticketDetail);
      const resultTicketDetail = await this.ticketDetailOrmRepository.save(ticketDetailPreload);
      return resultTicketDetail;
  }
  
  async updateTicketDetailById(id: number, tdUpdate: TicketDetailEntity): Promise<TicketDetailEntity> {
      const ticketDetail = await this.ticketDetailOrmRepository.findOneBy({id: id});
      if (!ticketDetail) return null;

      const ticketDetailPreload = await this.ticketDetailOrmRepository.preload({
          id: ticketDetail.id,
          ticket: ticketDetail.ticket,
          ...tdUpdate
      })
      const tickeDetailUpdated = await this.ticketDetailOrmRepository.save(ticketDetailPreload);
      return tickeDetailUpdated;
  }
  
  async deleteTicketDetailById(id: number): Promise<TicketDetailEntity> {
      const ticketDetail = await this.ticketDetailOrmRepository.findOneBy({id: id});
      if (!ticketDetail) return null;

      const resultTicketDetail = await this.ticketDetailOrmRepository.remove(ticketDetail);
      return resultTicketDetail;
  }
  
  async findTicketDetailByTicketId(ticketId: number): Promise<TicketDetailEntity> {
      const resultTicketDetail = this.ticketDetailOrmRepository.findOneBy({ ticket: {id: ticketId} });
      if (!resultTicketDetail) return null;
      return resultTicketDetail;
  }

    async updateTicketDetailByTicketId(ticketId: number, tdUpdate: TicketDetailEntity): Promise<TicketDetailEntity> {
        const ticketDetail = await this.ticketDetailOrmRepository.findOneBy({ticket: {id: ticketId}});
        if (!ticketDetail) return null;
  
        const ticketDetailPreload = await this.ticketDetailOrmRepository.preload({
            id: ticketDetail.id,
            ticket: ticketDetail.ticket,
            ...tdUpdate
        })
        const tickeDetailUpdated = await this.ticketDetailOrmRepository.save(ticketDetailPreload);
        return tickeDetailUpdated;
    }
    
    async deleteTicketDetailByTicketId(ticketId: number): Promise<TicketDetailEntity> {
        const ticketDetail = await this.ticketDetailOrmRepository.findOneBy({ticket: {id: ticketId}});
        if (!ticketDetail) return null;
  
        const resultTicketDetail = await this.ticketDetailOrmRepository.remove(ticketDetail);
        return resultTicketDetail;
    }
}
