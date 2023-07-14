import { DatabaseModule } from './utils/database/database.module';
import { TicketModule } from './ticket/ticket.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TicketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
