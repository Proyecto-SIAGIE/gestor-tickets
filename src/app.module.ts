import { TicketDetailController } from './ticket-detail/infrastructure/controller/ticketDetail.controller';
import { TicketDetailImplService } from './ticket-detail/application/service/ticketdetailimpl.service';
import { TickeDetailModule } from './ticket-detail/tickedetail.module';
import { IieeModule } from './iiee/iiee.module';
import { NoteModule } from './notes/note.module';
import { FileModule } from './file/file.module';
import { UserOticModule } from './user-otic/userotic.module';
import { UserExternalModule } from './user-external/userexternal.module';
import { DatabaseModule } from './utils/database/database.module';
import { TicketModule } from './ticket/ticket.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    TickeDetailModule,
    IieeModule,
    NoteModule,
    FileModule,
    UserOticModule,
    UserExternalModule,
    ConfigModule.forRoot(),
    DatabaseModule,
    TicketModule,
    RoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
