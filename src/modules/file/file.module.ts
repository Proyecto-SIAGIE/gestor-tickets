import { FileController } from './infrastructure/controller/file.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './domain/model/file.entity';
import { FileImplService } from './application/service/fileimpl.service';
import { FileImplRepository } from './infrastructure/fileImpl.repository';
import { NoteEntity } from '../notes/domain/model/note.entity';
import { TicketEntity } from '../ticket/domain/model/ticket.entity';


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
