/*
https://docs.nestjs.com/providers#services
*/

import { HttpStatus, Injectable } from '@nestjs/common';
import { TicketDetailRequestDto } from '../dto/ticketDetailReq.dto';
import { TicketDetailResponseDto } from '../dto/ticketDetailRes.dto';
import { mapper } from 'src/utils/mapping/mapper';
import { ErrorManager } from 'src/utils/errors/error.manager';
import { TicketDetailEntity } from '../../domain/model/ticketDetail.entity';
import { TicketDetailService } from '../../domain/interface/ticketDetail.service';
import { TicketDetailImplRepository } from '../../infrastructure/ticketDetailImpl.repository';
import { IGenericResponse } from 'src/utils/generic';

@Injectable()
export class TicketDetailImplService implements TicketDetailService{
    constructor(private readonly ticketDetailRepository: TicketDetailImplRepository){}
    
    async updateTicketDetailById(id: number, tdUpdate: TicketDetailRequestDto): Promise<IGenericResponse<TicketDetailResponseDto>> {
        try {
            const ticketDetailEntity = mapper.map(tdUpdate, TicketDetailRequestDto, TicketDetailEntity);
            const responseTd = await this.ticketDetailRepository.updateTicketDetailById(id, ticketDetailEntity);
            if (!responseTd) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Ticket-detail with Id ${id} not found`
                })
            }
            const mapTd = mapper.map(responseTd, TicketDetailEntity, TicketDetailResponseDto);

            return {
                success: true,
                code: HttpStatus.OK,
                data: mapTd,
                messages: []
            }

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async deleteTicketDetailById(id: number): Promise<IGenericResponse<TicketDetailResponseDto>> {
        try {
            const responseTd = await this.ticketDetailRepository.deleteTicketDetailById(id);
            if (!responseTd) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Ticket-detail with Id ${id} not found`
                })
            }
            const mapTd = mapper.map(responseTd, TicketDetailEntity, TicketDetailResponseDto);

            return {
                success: true,
                code: HttpStatus.OK,
                data: mapTd,
                messages: []
            }

    
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    

}
