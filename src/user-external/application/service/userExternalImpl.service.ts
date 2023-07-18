/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { UserExternalService } from 'src/user-external/domain/userExternal.service';
import { UserExternalImplRepository } from 'src/user-external/infrastructure/userExternalImpl.repository';
import { UserExternalRequestDto } from '../dto/userExternalReq.dto';
import { UserExternalResponseDto } from '../dto/userExternalRes.dto';
import { mapper } from 'src/utils/mapping/mapper';
import { UserExternalEntity } from 'src/user-external/domain/model/userExternal.entity';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class UserExternalImplService implements UserExternalService {
    constructor(private readonly userRepository: UserExternalImplRepository){}
    
    async registerUserExternal(user: UserExternalRequestDto): Promise<UserExternalResponseDto> {
        try {
            const userEntity = mapper.map(user, UserExternalRequestDto, UserExternalEntity);
            const responseUser = await this.userRepository.createUserExternal(userEntity);

            return mapper.map(responseUser, UserExternalEntity, UserExternalResponseDto);

        } catch (error) {
            throw new ExceptionsHandler(error);
        }
    }
    
    async updateUserExternalById(id: number, userRequest: UserExternalRequestDto): Promise<UserExternalResponseDto> {
        try {
            const userEntity = mapper.map(userRequest, UserExternalRequestDto, UserExternalEntity);
            const responseUser = await this.userRepository.updateUserExternalById(id, userEntity);

            return mapper.map(responseUser, UserExternalEntity, UserExternalResponseDto);

        } catch (error) {
            throw new ExceptionsHandler(error);
        }
    }
    
    async deleteUserExtenalById(id: number): Promise<UserExternalResponseDto> {
        try {
            
            const responseUser = await this.userRepository.deleteUserExtenalById(id);

            return mapper.map(responseUser, UserExternalEntity, UserExternalResponseDto);

        } catch (error) {
            throw new ExceptionsHandler(error);
        }
    }
    
    async findUserExternalById(id: number): Promise<UserExternalResponseDto> {
        try {
            const responseUser = await this.userRepository.findUserExternalById(id);

            return mapper.map(responseUser, UserExternalEntity, UserExternalResponseDto);

        } catch (error) {
            throw new ExceptionsHandler(error);
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
