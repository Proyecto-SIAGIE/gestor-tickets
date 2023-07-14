import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from './domain/model/ticket.entity';
import { TicketImplService } from './application/service/ticketImpl.service';
import { TicketImplRepository } from './infrastructure/ticketImpl.repository';
import { TicketController } from './infrastructure/controller/ticket.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([TicketEntity])
    ],
    controllers: [TicketController],
    providers: [TicketImplService, TicketImplRepository],
})
export class TicketModule {}
