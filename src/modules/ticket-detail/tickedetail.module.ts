/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketDetailEntity } from './domain/model/ticketDetail.entity';
import { TicketDetailImplService } from './application/service/ticketdetailimpl.service';
import { TicketDetailImplRepository } from './infrastructure/ticketDetailImpl.repository';
import { TicketDetailController } from './infrastructure/controller/ticketDetail.controller';
import { TicketEntity } from '../ticket/domain/model/ticket.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([TicketDetailEntity]),
        TypeOrmModule.forFeature([TicketEntity])
    ],
    controllers: [TicketDetailController],
    providers: [TicketDetailImplService, TicketDetailImplRepository],
})
export class TickeDetailModule {}
