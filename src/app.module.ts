import { UserExternalImplService } from './user-external/application/service/userExternalImpl.service';
import { UserExternalModule } from './user-external/userexternal.module';

import { DatabaseModule } from './utils/database/database.module';
import { TicketModule } from './ticket/ticket.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
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
