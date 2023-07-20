import { createMap, createMapper } from '@automapper/core';
import { mapper } from './mapper';
import { TicketEntity } from 'src/ticket/domain/model/ticket.entity';
import { TicketRequestDto } from 'src/ticket/application/dto/ticketReq.dto';
import { RoleRequestDto } from 'src/role/application/dto/roleReq.dto';
import { RoleEntity } from 'src/role/domain/model/role.entity';
import { UserExternalRequestDto } from 'src/user-external/application/dto/userExternalReq.dto';
import { UserExternalEntity } from 'src/user-external/domain/model/userExternal.entity';
import { UserOticRequestDto } from 'src/user-otic/application/dto/userOticReq.dto';
import { UserOticEntity } from 'src/user-otic/domain/model/userOtic.entity';
import { FileRequestDto } from 'src/file/application/dto/fileReq.dto';
import { FileEntity } from 'src/file/domain/model/file.entity';
import { NoteRequestDto } from 'src/notes/application/dto/noteReq.dto';
import { NoteEntity } from 'src/notes/domain/model/note.entity';

export const resourceToModel = () => {
    createMap(mapper, TicketRequestDto, TicketEntity);
    createMap(mapper, RoleRequestDto, RoleEntity);
    createMap(mapper, UserExternalRequestDto, UserExternalEntity);
    createMap(mapper, UserOticRequestDto, UserOticEntity);
    createMap(mapper, FileRequestDto, FileEntity);
    createMap(mapper, NoteRequestDto, NoteEntity);
}
