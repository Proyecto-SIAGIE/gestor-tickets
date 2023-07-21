import { TagController } from './infrastructure/controller/tag.controller';
import { TagImplService } from './application/service/tagImpl.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TagImplRepository } from './infrastructure/repository/tagImpl.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './domain/model/tag.entity';
import { TicketDetailEntity } from '../ticket-detail/domain/model/ticketDetail.entity';
import { TicketEntity } from '../ticket/domain/model/ticket.entity';
import { TicketDetailImplRepository } from '../ticket-detail/infrastructure/ticketDetailImpl.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([TagEntity]),
        TypeOrmModule.forFeature([TicketDetailEntity]),
        TypeOrmModule.forFeature([TicketEntity])
    ],
    controllers: [
        TagController, ],
    providers: [
        TagImplService, TagImplRepository, TicketDetailImplRepository],
})
export class TagModule {}
