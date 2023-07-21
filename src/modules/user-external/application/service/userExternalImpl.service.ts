/*
https://docs.nestjs.com/providers#services
*/

import { Injectable} from '@nestjs/common';
import { UserExternalRequestDto } from '../dto/userExternalReq.dto';
import { UserExternalResponseDto } from '../dto/userExternalRes.dto';
import { mapper } from 'src/utils/mapping/mapper';
import { ErrorManager } from 'src/utils/errors/error.manager';
import { TicketRequestDto } from 'src/modules/ticket/application/dto/ticketReq.dto';
import { TicketResponseDto } from 'src/modules/ticket/application/dto/ticketRes.dto';
import { TicketEntity } from 'src/modules/ticket/domain/model/ticket.entity';
import { UserExternalEntity } from '../../domain/model/userExternal.entity';
import { UserExternalService } from '../../domain/userExternal.service';
import { UserExternalImplRepository } from '../../infrastructure/userExternalImpl.repository';


@Injectable()
export class UserExternalImplService implements UserExternalService {
    constructor(private readonly userRepository: UserExternalImplRepository) { }
    
    async createTicketByRequesterUserId(userId: number, ticket: TicketRequestDto): Promise<TicketResponseDto> {
        try{

            const ticketEntity = mapper.map(ticket, TicketRequestDto, TicketEntity);
            const responseTicket = await this.userRepository.createTicketByRequesterUserId(userId,ticketEntity);
            
            return mapper.map(responseTicket, TicketEntity, TicketResponseDto);

        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    
    async assignRoleToUserExternal(roleId: number, userId: number): Promise<UserExternalResponseDto> {
        try{
            const responseUser = await this.userRepository.assignRoleToUserExternal(roleId,userId);
            if(!responseUser) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `User-External with Id ${userId} not found`
                })
            }

            return mapper.map(responseUser, UserExternalEntity, UserExternalResponseDto);

        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }

    }
    
    async unassignRoleToUserExternal(roleId: number, userId: number): Promise<UserExternalResponseDto> {
        try{
            const responseUser = await this.userRepository.unassignRoleToUserExternal(roleId,userId);
            if(!responseUser) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `User-External with Id ${userId} not found`
                })
            }
            return mapper.map(responseUser, UserExternalEntity, UserExternalResponseDto);

        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async listUserExternalsByRoleId(roleId: number): Promise<UserExternalResponseDto[]> {
        const responseUsers = await this.userRepository.listUserExternalsByRoleId(roleId);

        const users = responseUsers.map(responseUser =>
            mapper.map(responseUser, UserExternalEntity, UserExternalResponseDto)
        );

        return users;
    }

    async registerUserExternal(user: UserExternalRequestDto): Promise<UserExternalResponseDto> {
        try {
            const userEntity = mapper.map(user, UserExternalRequestDto, UserExternalEntity);
            const responseUser = await this.userRepository.createUserExternal(userEntity);

            return mapper.map(responseUser, UserExternalEntity, UserExternalResponseDto);

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async updateUserExternalById(id: number, userRequest: UserExternalRequestDto): Promise<UserExternalResponseDto> {
        try {
            const userEntity = mapper.map(userRequest, UserExternalRequestDto, UserExternalEntity);
            const responseUser = await this.userRepository.updateUserExternalById(id, userEntity);
            if (!responseUser) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `User-External with Id ${id} not found`
                })
            }
            return mapper.map(responseUser, UserExternalEntity, UserExternalResponseDto);

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async deleteUserExtenalById(id: number): Promise<UserExternalResponseDto> {
        try {
            const responseUser = await this.userRepository.deleteUserExtenalById(id);
            if (!responseUser) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `User-External with Id ${id} not found`
                })
            }
            const user = mapper.map(responseUser, UserExternalEntity, UserExternalResponseDto);
            return user;

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async findUserExternalById(id: number): Promise<UserExternalResponseDto> {
        try {
            const responseUser = await this.userRepository.findUserExternalById(id);
            if (!responseUser) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `User-External with Id ${id} not found`
                })
            }
            const user = mapper.map(responseUser, UserExternalEntity, UserExternalResponseDto);
            return user;

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }

    }



    async listAllUserExternals(): Promise<UserExternalResponseDto[]> {
        const responseUsers = await this.userRepository.listAllUserExternals();

        const users = responseUsers.map(responseUser =>
            mapper.map(responseUser, UserExternalEntity, UserExternalResponseDto)
        );

        return users;
    }


}
