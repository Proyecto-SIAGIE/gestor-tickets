import { NoteController } from './infrastructure/controller/note.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from './domain/model/note.entity';
import { NoteImplService } from './application/service/noteimpl.service';
import { NoteImplRepository } from './infrastructure/noteImpl.repository';
import { FileEntity } from '../file/domain/model/file.entity';
import { FileImplRepository } from '../file/infrastructure/fileImpl.repository';
import { TicketEntity } from '../ticket/domain/model/ticket.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([NoteEntity]),
    TypeOrmModule.forFeature([TicketEntity]),
    TypeOrmModule.forFeature([FileEntity]),
  ],
  controllers: [NoteController],
  providers: [NoteImplService, NoteImplRepository, FileImplRepository],
})
export class NoteModule {}
