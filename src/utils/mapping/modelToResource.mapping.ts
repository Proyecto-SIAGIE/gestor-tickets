import { createMap, forMember } from '@automapper/core';
import { mapper } from './mapper';
import { TicketEntity } from 'src/ticket/domain/model/ticket.entity';
import { TicketResponseDto } from 'src/ticket/application/dto/ticketRes.dto';
import { RoleEntity } from 'src/role/domain/model/role.entity';
import { RoleResponseDto } from 'src/role/application/dto/roleRes.dto';
import { UserExternalEntity } from 'src/user-external/domain/model/userExternal.entity';
import { UserExternalResponseDto } from 'src/user-external/application/dto/userExternalRes.dto';
import { UserOticEntity } from 'src/user-otic/domain/model/userOtic.entity';
import { UserOticResponseDto } from 'src/user-otic/application/dto/userOticRes.dto';
import { FileEntity } from 'src/file/domain/model/file.entity';
import { FileResponseDto } from 'src/file/application/dto/fileRes.dto';
import { NoteEntity } from 'src/notes/domain/model/note.entity';
import { NoteResponseDto } from 'src/notes/application/dto/noteRes.dto';
import { IieeEntity } from 'src/iiee/domain/model/iiee.entity';
import { IieeResponseDto } from 'src/iiee/application/dto/iieeRes.dto';

export const modelToResource = () =>{
    createMap(mapper, TicketEntity, TicketResponseDto);
    createMap(mapper, RoleEntity, RoleResponseDto);
    createMap(mapper, UserExternalEntity, UserExternalResponseDto);
    createMap(mapper, UserOticEntity, UserOticResponseDto);
    createMap(mapper, FileEntity, FileResponseDto);
    createMap(mapper, NoteEntity, NoteResponseDto);
    createMap(mapper, IieeEntity, IieeResponseDto);
}
