import { FileController } from './infrastructure/controller/file.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './domain/model/file.entity';
import { FileImplService } from './application/service/fileimpl.service';
import { FileImplRepository } from './infrastructure/fileImpl.repository';
import { TicketImplRepository } from 'src/ticket/infrastructure/ticketImpl.repository';
import { TicketEntity } from 'src/ticket/domain/model/ticket.entity';
import { NoteEntity } from 'src/notes/domain/model/note.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity]),
    TypeOrmModule.forFeature([TicketEntity]),
    TypeOrmModule.forFeature([NoteEntity]),
  ],
  controllers: [FileController],
  providers: [FileImplService, FileImplRepository],
})
export class FileModule {}
