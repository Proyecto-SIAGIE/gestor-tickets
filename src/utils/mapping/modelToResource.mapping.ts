import { createMap, forMember } from '@automapper/core';
import { mapper } from './mapper';
import { FileResponseDto } from 'src/modules/file/application/dto/fileRes.dto';
import { FileEntity } from 'src/modules/file/domain/model/file.entity';
import { IieeResponseDto } from 'src/modules/iiee/application/dto/iieeRes.dto';
import { IieeEntity } from 'src/modules/iiee/domain/model/iiee.entity';
import { NoteResponseDto } from 'src/modules/notes/application/dto/noteRes.dto';
import { NoteEntity } from 'src/modules/notes/domain/model/note.entity';
import { RoleResponseDto } from 'src/modules/role/application/dto/roleRes.dto';
import { RoleEntity } from 'src/modules/role/domain/model/role.entity';
import { TicketDetailResponseDto } from 'src/modules/ticket-detail/application/dto/ticketDetailRes.dto';
import { TicketDetailEntity } from 'src/modules/ticket-detail/domain/model/ticketDetail.entity';
import { TicketResponseDto } from 'src/modules/ticket/application/dto/ticketRes.dto';
import { TicketEntity } from 'src/modules/ticket/domain/model/ticket.entity';
import { UserExternalResponseDto } from 'src/modules/user-external/application/dto/userExternalRes.dto';
import { UserExternalEntity } from 'src/modules/user-external/domain/model/userExternal.entity';
import { UserOticResponseDto } from 'src/modules/user-otic/application/dto/userOticRes.dto';
import { UserOticEntity } from 'src/modules/user-otic/domain/model/userOtic.entity';


export const modelToResource = () =>{
    createMap(mapper, TicketEntity, TicketResponseDto);
    createMap(mapper, RoleEntity, RoleResponseDto);
    createMap(mapper, UserExternalEntity, UserExternalResponseDto);
    createMap(mapper, UserOticEntity, UserOticResponseDto);
    createMap(mapper, FileEntity, FileResponseDto);
    createMap(mapper, NoteEntity, NoteResponseDto);
    createMap(mapper, IieeEntity, IieeResponseDto);
    createMap(mapper, TicketDetailEntity, TicketDetailResponseDto);
}
