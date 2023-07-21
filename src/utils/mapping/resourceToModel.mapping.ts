import { createMap, createMapper } from '@automapper/core';
import { mapper } from './mapper';
import { FileRequestDto } from 'src/modules/file/application/dto/fileReq.dto';
import { FileEntity } from 'src/modules/file/domain/model/file.entity';
import { IieeRequestDto } from 'src/modules/iiee/application/dto/iieeReq.dto';
import { IieeEntity } from 'src/modules/iiee/domain/model/iiee.entity';
import { NoteRequestDto } from 'src/modules/notes/application/dto/noteReq.dto';
import { NoteEntity } from 'src/modules/notes/domain/model/note.entity';
import { RoleRequestDto } from 'src/modules/role/application/dto/roleReq.dto';
import { RoleEntity } from 'src/modules/role/domain/model/role.entity';
import { TicketDetailRequestDto } from 'src/modules/ticket-detail/application/dto/ticketDetailReq.dto';
import { TicketDetailEntity } from 'src/modules/ticket-detail/domain/model/ticketDetail.entity';
import { TicketRequestDto } from 'src/modules/ticket/application/dto/ticketReq.dto';
import { TicketEntity } from 'src/modules/ticket/domain/model/ticket.entity';
import { UserExternalRequestDto } from 'src/modules/user-external/application/dto/userExternalReq.dto';
import { UserExternalEntity } from 'src/modules/user-external/domain/model/userExternal.entity';
import { UserOticRequestDto } from 'src/modules/user-otic/application/dto/userOticReq.dto';
import { UserOticEntity } from 'src/modules/user-otic/domain/model/userOtic.entity';


export const resourceToModel = () => {
    createMap(mapper, TicketRequestDto, TicketEntity);
    createMap(mapper, RoleRequestDto, RoleEntity);
    createMap(mapper, UserExternalRequestDto, UserExternalEntity);
    createMap(mapper, UserOticRequestDto, UserOticEntity);
    createMap(mapper, FileRequestDto, FileEntity);
    createMap(mapper, NoteRequestDto, NoteEntity);
    createMap(mapper, IieeRequestDto, IieeEntity);
    createMap(mapper, TicketDetailRequestDto, TicketDetailEntity);
}
