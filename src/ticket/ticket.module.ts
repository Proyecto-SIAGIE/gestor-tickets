import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from './domain/model/ticket.entity';
import { TicketImplService } from './application/service/ticketImpl.service';
import { TicketImplRepository } from './infrastructure/ticketImpl.repository';
import { TicketController } from './infrastructure/controller/ticket.controller';
import { FileImplRepository } from 'src/file/infrastructure/fileImpl.repository';
import { FileEntity } from 'src/file/domain/model/file.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([TicketEntity]),
        TypeOrmModule.forFeature([FileEntity])
    ],
    controllers: [TicketController],
    providers: [TicketImplService, TicketImplRepository, FileImplRepository],
})
export class TicketModule {}
