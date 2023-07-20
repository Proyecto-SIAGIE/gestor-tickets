import { IieeController } from './infrastructure/controller/iiee.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IieeEntity } from './domain/model/iiee.entity';
import { IieeImplRepository } from './infrastructure/iieeImpl.repository';
import { IieeImplService } from './application/service/iieeimpl.service';
import { TicketImplRepository } from 'src/ticket/infrastructure/ticketImpl.repository';
import { TicketEntity } from 'src/ticket/domain/model/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IieeEntity]),
    TypeOrmModule.forFeature([TicketEntity])
  ],
  controllers: [IieeController],
  providers: [IieeImplService,IieeImplRepository, TicketImplRepository],
})
export class IieeModule {}
