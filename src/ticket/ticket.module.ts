import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from './domain/model/ticket.entity';
import { TicketImplService } from './application/service/ticketImpl.service';
import { TicketImplRepository } from './infrastructure/ticketImpl.repository';
import { TicketController } from './infrastructure/controller/ticket.controller';
import { FileImplRepository } from 'src/file/infrastructure/fileImpl.repository';
import { FileEntity } from 'src/file/domain/model/file.entity';
import { NoteImplRepository } from 'src/notes/infrastructure/noteImpl.repository';
import { NoteEntity } from 'src/notes/domain/model/note.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([TicketEntity]),
        TypeOrmModule.forFeature([FileEntity]),
        TypeOrmModule.forFeature([NoteEntity]),
    ],
    controllers: [TicketController],
    providers: [TicketImplService, TicketImplRepository, FileImplRepository, NoteImplRepository],
})
export class TicketModule {}
