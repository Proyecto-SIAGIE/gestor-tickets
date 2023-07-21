import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from './domain/model/ticket.entity';
import { TicketImplService } from './application/service/ticketImpl.service';
import { TicketImplRepository } from './infrastructure/ticketImpl.repository';
import { TicketController } from './infrastructure/controller/ticket.controller';
import { FileEntity } from '../file/domain/model/file.entity';
import { FileImplRepository } from '../file/infrastructure/fileImpl.repository';
import { IieeEntity } from '../iiee/domain/model/iiee.entity';
import { NoteEntity } from '../notes/domain/model/note.entity';
import { NoteImplRepository } from '../notes/infrastructure/noteImpl.repository';
import { TicketDetailEntity } from '../ticket-detail/domain/model/ticketDetail.entity';
import { TicketDetailImplRepository } from '../ticket-detail/infrastructure/ticketDetailImpl.repository';


@Module({
    imports: [
        TypeOrmModule.forFeature([TicketEntity]),
        TypeOrmModule.forFeature([IieeEntity]),
        TypeOrmModule.forFeature([FileEntity]),
        TypeOrmModule.forFeature([NoteEntity]),
        TypeOrmModule.forFeature([TicketDetailEntity])
    ],
    controllers: [TicketController],
    providers: [TicketImplService, TicketImplRepository, FileImplRepository, NoteImplRepository,TicketDetailImplRepository],
})
export class TicketModule {}
