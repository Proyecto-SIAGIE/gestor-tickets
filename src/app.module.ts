import { TagModule } from './modules/tag/tag.module';

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './modules/file/file.module';
import { IieeModule } from './modules/iiee/iiee.module';
import { NoteModule } from './modules/notes/note.module';
import { RoleModule } from './modules/role/role.module';
import { TickeDetailModule } from './modules/ticket-detail/tickedetail.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { UserExternalModule } from './modules/user-external/userexternal.module';
import { UserOticModule } from './modules/user-otic/userotic.module';
import { DatabaseModule } from './common/database/database.module';
import { ApiTokenCheckMiddleware } from './common/middleware/apitokencheck.middleware';

@Module({
  imports: [
    TagModule,
    TickeDetailModule,
    IieeModule,
    NoteModule,
    FileModule,
    UserOticModule,
    UserExternalModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TicketModule,
    RoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiTokenCheckMiddleware)
      .forRoutes({ path: '/*', method: RequestMethod.ALL });
  }
}
