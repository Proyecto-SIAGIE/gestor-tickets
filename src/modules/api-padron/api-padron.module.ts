import { Module } from "@nestjs/common";
import { ApiPadronController } from "./infrastructure/controller/api-padron.controller";
import { ApiPadronImplService } from "./application/service/api-padronImpl.service";
import { JwtModule } from "@nestjs/jwt";
import * as fs from 'fs';
import * as path from 'path';

@Module({
    imports: [
      JwtModule.registerAsync({
        useFactory: async () => ({
          privateKey: fs.readFileSync(path.resolve(__dirname, '../../keys/api-padron/private.key')),
          publicKey: fs.readFileSync(path.resolve(__dirname, '../../keys/api-padron/public.key')),
          signOptions: { algorithm: 'RS256' },
        }),
      }),
    ],
    controllers: [ApiPadronController],
    providers: [ApiPadronImplService],
  })
  export class ApiPadronModule {}
  