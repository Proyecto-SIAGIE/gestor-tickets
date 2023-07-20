import { NoteController } from './infrastructure/controller/note.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from './domain/model/note.entity';
import { TicketEntity } from 'src/ticket/domain/model/ticket.entity';
import { NoteImplService } from './application/service/noteimpl.service';
import { NoteImplRepository } from './infrastructure/noteImpl.repository';
import { FileImplRepository } from 'src/file/infrastructure/fileImpl.repository';
import { FileEntity } from 'src/file/domain/model/file.entity';

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
