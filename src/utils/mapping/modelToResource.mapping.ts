import { createMap, forMember } from '@automapper/core';
import { mapper } from './mapper';
import { TicketEntity } from 'src/ticket/domain/model/ticket.entity';
import { TicketResponseDto } from 'src/ticket/application/dto/ticketRes.dto';

export const modelToResource = () =>{
    createMap(mapper, TicketEntity, TicketResponseDto);
}
