/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { TicketDetailImplService } from '../../application/service/ticketdetailimpl.service';


@Controller()
export class TicketDetailController {
    constructor(private readonly ticketDetailService: TicketDetailImplService){}

    
}
