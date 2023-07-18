import { createMap, createMapper } from '@automapper/core';
import { mapper } from './mapper';
import { TicketEntity } from 'src/ticket/domain/model/ticket.entity';
import { TicketRequestDto } from 'src/ticket/application/dto/ticketReq.dto';
import { RoleRequestDto } from 'src/role/application/dto/roleReq.dto';
import { RoleEntity } from 'src/role/domain/model/role.entity';
import { UserExternalRequestDto } from 'src/user-external/application/dto/userExternalReq.dto';
import { UserExternalEntity } from 'src/user-external/domain/model/userExternal.entity';

export const resourceToModel = () => {
    createMap(mapper, TicketRequestDto, TicketEntity);
    createMap(mapper, RoleRequestDto, RoleEntity);
    createMap(mapper, UserExternalRequestDto, UserExternalEntity);
}
