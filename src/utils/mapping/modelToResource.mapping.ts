import { createMap, forMember } from '@automapper/core';
import { mapper } from './mapper';
import { TicketEntity } from 'src/ticket/domain/model/ticket.entity';
import { TicketResponseDto } from 'src/ticket/application/dto/ticketRes.dto';
import { RoleEntity } from 'src/role/domain/model/role.entity';
import { RoleResponseDto } from 'src/role/application/dto/roleRes.dto';
import { UserExternalEntity } from 'src/user-external/domain/model/userExternal.entity';
import { UserExternalResponseDto } from 'src/user-external/application/dto/userExternalRes.dto';

export const modelToResource = () =>{
    createMap(mapper, TicketEntity, TicketResponseDto);
    createMap(mapper, RoleEntity, RoleResponseDto);
    createMap(mapper, UserExternalEntity, UserExternalResponseDto)
}
