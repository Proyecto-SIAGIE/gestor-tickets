import { createMap, createMapper } from '@automapper/core';
import { mapper } from './mapper';
import { TicketEntity } from 'src/ticket/domain/model/ticket.entity';
import { TicketRequestDto } from 'src/ticket/application/dto/ticketReq.dto';

export const resourceToModel = () => {
    createMap(mapper, TicketRequestDto, TicketEntity);
}
