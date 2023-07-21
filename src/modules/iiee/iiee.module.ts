import { IieeController } from './infrastructure/controller/iiee.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IieeEntity } from './domain/model/iiee.entity';
import { IieeImplRepository } from './infrastructure/iieeImpl.repository';
import { IieeImplService } from './application/service/iieeimpl.service';
import { TicketEntity } from '../ticket/domain/model/ticket.entity';
import { TicketImplRepository } from '../ticket/infrastructure/ticketImpl.repository';


@Module({
  imports: [TypeOrmModule.forFeature([IieeEntity]),
    TypeOrmModule.forFeature([TicketEntity])
  ],
  controllers: [IieeController],
  providers: [IieeImplService,IieeImplRepository, TicketImplRepository],
})
export class IieeModule {}
