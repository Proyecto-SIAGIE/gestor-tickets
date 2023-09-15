/*
https://docs.nestjs.com/providers#services
*/

import { HttpStatus, Injectable } from "@nestjs/common";
import { TicketResponseDto } from "src/modules/ticket/application/dto/ticketRes.dto";
import { TicketEntity } from "src/modules/ticket/domain/model/ticket.entity";
import { TicketImplRepository } from "src/modules/ticket/infrastructure/ticketImpl.repository";
import { ErrorManager } from "src/utils/errors/error.manager";
import { mapper } from "src/utils/mapping/mapper";
import { IieeService } from "../../domain/interface/iiee.service";
import { IieeEntity } from "../../domain/model/iiee.entity";
import { IieeImplRepository } from "../../infrastructure/iieeImpl.repository";
import { IieeRequestDto } from "../dto/iieeReq.dto";
import { IieeResponseDto } from "../dto/iieeRes.dto";
import { IGenericResponse } from "src/utils/generic";



@Injectable()
export class IieeImplService implements IieeService {
   
    constructor(private readonly iieeRepository: IieeImplRepository,
        private readonly ticketRepository: TicketImplRepository) {}
    
    
    async registerIiee(iiee: IieeRequestDto): Promise<IGenericResponse<IieeResponseDto>> {
        try {

            const existedIE = await this.iieeRepository.findIieeByModularCode(iiee.modularCode);
            if(existedIE){
                const mapExisted = mapper.map(existedIE, IieeEntity, IieeResponseDto);
                
                return {
                    success: true,
                    code: HttpStatus.CREATED,
                    data: mapExisted,
                    messages:['IIEE is already registered']
                }
            }


            const iieeEntity = mapper.map(iiee, IieeRequestDto, IieeEntity);

            const responseIiee = await this.iieeRepository.createIiee(iieeEntity);

            const mapIe = mapper.map(responseIiee, IieeEntity, IieeResponseDto);

            return {
                success: true,
                code: HttpStatus.CREATED,
                data: mapIe,
                messages:["Successfully registered IIEE"]
            }

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async updateIieeById(id: number, iieeRequest: IieeRequestDto): Promise<IGenericResponse<IieeResponseDto>> {
        try{
            const iieeEntity = mapper.map(iieeRequest, IieeRequestDto, IieeEntity);
            const responseIiee = await this.iieeRepository.updateIieeById(id, iieeEntity);
            if (!responseIiee) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `IIEE with Id ${id} not found`
                })
            }
            
            const mapIe = mapper.map(responseIiee, IieeEntity, IieeResponseDto);
            return {
                success: true,
                code: HttpStatus.OK,
                data: mapIe,
                messages:[]
            } 
        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async deleteIieeById(id: number): Promise<IGenericResponse<IieeResponseDto>> {
        try {
            const responseIiee = await this.iieeRepository.deleteIieeById(id);
            if (!responseIiee) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `IIEE with Id ${id} not found`
                })
            }
            const mapIe = mapper.map(responseIiee, IieeEntity, IieeResponseDto);
            
            return {
                success: true,
                code: HttpStatus.OK,
                data: mapIe,
                messages: []
            } 
        
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async findIieeById(id: number): Promise<IGenericResponse<IieeResponseDto>> {
        try {
            const responseIiee = await this.iieeRepository.findIieeById(id);
            if (!responseIiee) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `IIEE with Id ${id} not found`
                })
            }
            const mapIe = mapper.map(responseIiee, IieeEntity, IieeResponseDto);
            return {
                success: true,
                code: HttpStatus.OK,
                data: mapIe,
                messages: []
            } 
            
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

    async assignIieeToTicket(iieeId: number, ticketId: number): Promise<IGenericResponse<TicketResponseDto>> {
        try{
            const responseTicket = await this.ticketRepository.assignIieeToTicket(iieeId,ticketId);
            if(!responseTicket) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Ticket with Id ${ticketId} not found`
                })
            }

            const mapTicket = mapper.map(responseTicket, TicketEntity, TicketResponseDto);
            mapTicket.iieeId = iieeId;
            return {
                success: true,
                code: HttpStatus.OK,
                data: mapTicket,
                messages: []
            }
        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
}
