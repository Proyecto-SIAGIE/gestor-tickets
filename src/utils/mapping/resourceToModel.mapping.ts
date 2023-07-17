import { createMap, createMapper } from '@automapper/core';
import { mapper } from './mapper';
import { TicketEntity } from 'src/ticket/domain/model/ticket.entity';
import { TicketRequestDto } from 'src/ticket/application/dto/ticketReq.dto';
import { RoleRequestDto } from 'src/role/application/dto/roleReq.dto';
import { RoleEntity } from 'src/role/domain/model/role.entity';

export const resourceToModel = () => {
    createMap(mapper, TicketRequestDto, TicketEntity);
    createMap(mapper, RoleRequestDto, RoleEntity);
}
