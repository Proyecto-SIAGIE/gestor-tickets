/*
https://docs.nestjs.com/providers#services
*/

import { HttpStatus, Injectable} from '@nestjs/common';
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
import { IGenericResponse, IPaginatedRequest, IPaginatedResponse } from 'src/utils/interface/generic';


@Injectable()
export class UserExternalImplService implements UserExternalService {
    constructor(private readonly userRepository: UserExternalImplRepository) { }
    
    async createTicketByRequesterUserId(userId: number, ticket: TicketRequestDto): Promise<IGenericResponse<TicketResponseDto>> {
        try{

            const ticketEntity = mapper.map(ticket, TicketRequestDto, TicketEntity);
            const responseTicket = await this.userRepository.createTicketByRequesterUserId(userId,ticketEntity);
            
            const mapTicket = mapper.map(responseTicket, TicketEntity, TicketResponseDto);

            return {
                success: true,
                data: mapTicket,
                code: HttpStatus.CREATED,
                messages: ['Ticket successfully registered'],
            }

        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    
    async assignRoleToUserExternal(roleId: number, userId: number): Promise<IGenericResponse<UserExternalResponseDto>> {
        try{
            const responseUser = await this.userRepository.assignRoleToUserExternal(roleId,userId);
            if(!responseUser) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `User-External with Id ${userId} not found`
                })
            }

            const mapUser = mapper.map(responseUser, UserExternalEntity, UserExternalResponseDto);

            return {
                success: true,
                code: HttpStatus.OK,
                data: mapUser,
                messages: ['Role successfully assigned to User']              
            }

        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }

    }
    
    async unassignRoleToUserExternal(roleId: number, userId: number): Promise<IGenericResponse<UserExternalResponseDto>> {
        try{
            const responseUser = await this.userRepository.unassignRoleToUserExternal(roleId,userId);
            if(!responseUser) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `User-External with Id ${userId} not found`
                })
            }
            const mapUser = mapper.map(responseUser, UserExternalEntity, UserExternalResponseDto);

            return {
                success: true,
                code: HttpStatus.OK,
                data: mapUser,
                messages: ['Role successfully unassigned to User']              
            }

        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async listUserExternalsByRoleId(roleId: number, filter: IPaginatedRequest): Promise<IPaginatedResponse<UserExternalResponseDto>> {
        //const responseUsers = await this.userRepository.listUserExternalsByRoleId(roleId);

        const queryBuilder = this.userRepository.getOrmRepository().createQueryBuilder("user");

        queryBuilder
        .where("user.role_id = :roleId",{roleId: roleId})
        .orderBy("user."+filter.sortBy, filter.sortOrder)
        .skip(Math.max(0,(filter.page - 1) * filter.size))
        .take(filter.size)
        

        const itemCount = await queryBuilder.getCount();
        const { entities: responseUsers} = await queryBuilder.getRawAndEntities();
       
        const users = responseUsers.map(responseUser =>
            mapper.map(responseUser, UserExternalEntity, UserExternalResponseDto)
        );

        return {
            page: filter.page,
            recordsTotal: itemCount,
            size: filter.size,
            success: true,
            items: users
        };
    }

    async registerUserExternal(user: UserExternalRequestDto): Promise<IGenericResponse<UserExternalResponseDto>> {
        try {
            const userEntity = mapper.map(user, UserExternalRequestDto, UserExternalEntity);
            const responseUser = await this.userRepository.createUserExternal(userEntity);

            const mapUser = mapper.map(responseUser, UserExternalEntity, UserExternalResponseDto);

            return {
                success: true,
                code: HttpStatus.CREATED,
                data: mapUser,
                messages: ['Successfully registered user']              
            }

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async updateUserExternalById(id: number, userRequest: UserExternalRequestDto): Promise<IGenericResponse<UserExternalResponseDto>> {
        try {
            const userEntity = mapper.map(userRequest, UserExternalRequestDto, UserExternalEntity);
            const responseUser = await this.userRepository.updateUserExternalById(id, userEntity);
            if (!responseUser) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `User-External with Id ${id} not found`
                })
            }
            const mapUser = mapper.map(responseUser, UserExternalEntity, UserExternalResponseDto);
            
            return {
                success: true,
                code: HttpStatus.OK,
                data: mapUser,
                messages: ['Successfully updated user']              
            }

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async deleteUserExtenalById(id: number): Promise<IGenericResponse<UserExternalResponseDto>> {
        try {
            const responseUser = await this.userRepository.deleteUserExtenalById(id);
            if (!responseUser) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `User-External with Id ${id} not found`
                })
            }
            const mapUser = mapper.map(responseUser, UserExternalEntity, UserExternalResponseDto);

            return {
                success: true,
                code: HttpStatus.OK,
                data: mapUser,
                messages: ['Successfully removed user']              
            }

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async findUserExternalById(id: number): Promise<IGenericResponse<UserExternalResponseDto>> {
        try {
            const responseUser = await this.userRepository.findUserExternalById(id);
            if (!responseUser) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `User-External with Id ${id} not found`
                })
            }
            const mapUser = mapper.map(responseUser, UserExternalEntity, UserExternalResponseDto);
            return {
                success: true,
                data: mapUser,
                code: HttpStatus.OK,
                messages: ['Successfully found user']
            }

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }

    }



    async listAllUserExternals(filter: IPaginatedRequest): Promise<IPaginatedResponse<UserExternalResponseDto>> {
        //const responseUsers = await this.userRepository.listAllUserExternals();
        const queryBuilder = this.userRepository.getOrmRepository().createQueryBuilder("user");

        queryBuilder.orderBy("user."+filter.sortBy, filter.sortOrder)
        .skip((filter.page - 1) * filter.size)
        .take(filter.size);

        const itemCount = await queryBuilder.getCount();
        const { entities: responseUsers} = await queryBuilder.getRawAndEntities();
       
        const users = responseUsers.map(responseUser =>
            mapper.map(responseUser, UserExternalEntity, UserExternalResponseDto)
        );

        return {
            page: filter.page,
            recordsTotal: itemCount,
            size: filter.size,
            success: true,
            items: users
        };
    }


}
