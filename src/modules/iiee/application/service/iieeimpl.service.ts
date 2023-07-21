/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from "@nestjs/common";
import { TicketResponseDto } from "src/modules/ticket/application/dto/ticketRes.dto";
import { TicketEntity } from "src/modules/ticket/domain/model/ticket.entity";
import { TicketImplRepository } from "src/modules/ticket/infrastructure/ticketImpl.repository";
import { ErrorManager } from "src/utils/errors/error.manager";
import { mapper } from "src/utils/mapping/mapper";
import { IieeService } from "../../domain/iiee.service";
import { IieeEntity } from "../../domain/model/iiee.entity";
import { IieeImplRepository } from "../../infrastructure/iieeImpl.repository";
import { IieeRequestDto } from "../dto/iieeReq.dto";
import { IieeResponseDto } from "../dto/iieeRes.dto";



@Injectable()
export class IieeImplService implements IieeService {
   
    constructor(private readonly iieeRepository: IieeImplRepository,
        private readonly ticketRepository: TicketImplRepository) {}
    
    
    async registerIiee(iiee: IieeRequestDto): Promise<IieeResponseDto> {
        try {
            const iieeEntity = mapper.map(iiee, IieeRequestDto, IieeEntity);

            const responseIiee = await this.iieeRepository.createIiee(iieeEntity);

            return mapper.map(responseIiee, IieeEntity, IieeResponseDto);

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async updateIieeById(id: number, iieeRequest: IieeRequestDto): Promise<IieeResponseDto> {
        try{
            const iieeEntity = mapper.map(iieeRequest, IieeRequestDto, IieeEntity);
            const responseIiee = await this.iieeRepository.updateIieeById(id, iieeEntity);
            if (!responseIiee) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `IIEE with Id ${id} not found`
                })
            }
            return mapper.map(responseIiee, IieeEntity, IieeResponseDto);
        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async deleteIieeById(id: number): Promise<IieeResponseDto> {
        try {
            const responseIiee = await this.iieeRepository.deleteIieeById(id);
            if (!responseIiee) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `IIEE with Id ${id} not found`
                })
            }
            return mapper.map(responseIiee, IieeEntity, IieeResponseDto);
        
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async findIieeById(id: number): Promise<IieeResponseDto> {
        try {
            const responseIiee = await this.iieeRepository.findIieeById(id);
            if (!responseIiee) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `IIEE with Id ${id} not found`
                })
            }
            return mapper.map(responseIiee, IieeEntity, IieeResponseDto);
            
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async listAllIiees(): Promise<IieeResponseDto[]> {
        const responseIiees = await this.iieeRepository.listAllIiees();

        const iiees = responseIiees.map(responseIiee =>
            mapper.map(responseIiee, IieeEntity, IieeResponseDto)
        );

        return iiees;
    }

    async assignIieeToTicket(iieeId: number, ticketId: number): Promise<TicketResponseDto> {
        try{
            const responseTicket = await this.ticketRepository.assignIieeToTicket(iieeId,ticketId);
            if(!responseTicket) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Ticket with Id ${ticketId} not found`
                })
            }

            const ticket = mapper.map(responseTicket, TicketEntity, TicketResponseDto);
            ticket.iieeId = iieeId;
            return ticket;
        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
}
