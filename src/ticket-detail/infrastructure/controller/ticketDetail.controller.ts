/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { TicketDetailRequestDto } from 'src/ticket-detail/application/dto/ticketDetailReq.dto';
import { TicketDetailImplService } from 'src/ticket-detail/application/service/ticketdetailimpl.service';

@Controller()
export class TicketDetailController {
    constructor(private readonly ticketDetailService: TicketDetailImplService){}

    
}
