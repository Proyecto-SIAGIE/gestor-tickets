/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { TicketDetailService } from 'src/ticket-detail/domain/ticketDetail.service';
import { TicketDetailImplRepository } from 'src/ticket-detail/infrastructure/ticketDetailImpl.repository';
import { TicketDetailRequestDto } from '../dto/ticketDetailReq.dto';
import { TicketDetailResponseDto } from '../dto/ticketDetailRes.dto';
import { mapper } from 'src/utils/mapping/mapper';
import { TicketDetailEntity } from 'src/ticket-detail/domain/model/ticketDetail.entity';
import { ErrorManager } from 'src/utils/errors/error.manager';

@Injectable()
export class TicketDetailImplService implements TicketDetailService{
    constructor(private readonly ticketDetailRepository: TicketDetailImplRepository){}
    
    async updateTicketDetailById(id: number, tdUpdate: TicketDetailRequestDto): Promise<TicketDetailResponseDto> {
        try {
            const ticketDetailEntity = mapper.map(tdUpdate, TicketDetailRequestDto, TicketDetailEntity);
            const responseTd = await this.ticketDetailRepository.updateTicketDetailById(id, ticketDetailEntity);
            if (!responseTd) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Ticket-detail with Id ${id} not found`
                })
            }
            return mapper.map(responseTd, TicketDetailEntity, TicketDetailResponseDto);

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async deleteTicketDetailById(id: number): Promise<TicketDetailResponseDto> {
        try {
            const responseTd = await this.ticketDetailRepository.deleteTicketDetailById(id);
            if (!responseTd) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Ticket-detail with Id ${id} not found`
                })
            }
            return mapper.map(responseTd, TicketDetailEntity, TicketDetailResponseDto);
    
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    

}
