/*
https://docs.nestjs.com/providers#services
*/

import { HttpStatus, Injectable } from '@nestjs/common';
import { UserOticRequestDto } from '../dto/userOticReq.dto';
import { UserOticResponseDto } from '../dto/userOticRes.dto';
import { mapper } from 'src/utils/mapping/mapper';
import { ErrorManager } from 'src/utils/errors/error.manager';
import { UserOticEntity } from '../../domain/model/userOtic.entity';
import { UserOticService } from '../../domain/interface/userOtic.service';
import { UserOticImplRepository } from '../../infrastructure/userOticImpl.repository';
import { IGenericResponse } from 'src/utils/generic';

@Injectable()
export class UserOticImplService implements UserOticService {
    constructor(private readonly userRepository: UserOticImplRepository){}
    
    async registerUserOtic(user: UserOticRequestDto): Promise<IGenericResponse<UserOticResponseDto>> {
        try {
            const userEntity = mapper.map(user, UserOticRequestDto, UserOticEntity);
            const responseUser = await this.userRepository.createUserOtic(userEntity);

            const mapUser = mapper.map(responseUser, UserOticEntity, UserOticResponseDto);
            return {
                success: true,
                code: HttpStatus.OK,
                data: mapUser,
                messages: []
            } 

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async updateUserOticById(id: number, userRequest: UserOticRequestDto): Promise<IGenericResponse<UserOticResponseDto>> {
        try {
            const userEntity = mapper.map(userRequest, UserOticRequestDto, UserOticEntity);
            const responseUser = await this.userRepository.updateUserOticById(id, userEntity);
            if (!responseUser) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `User-Otic with Id ${id} not found`
                })
            }
            const mapUser = mapper.map(responseUser, UserOticEntity, UserOticResponseDto);

            return {
                success: true,
                code: HttpStatus.OK,
                data: mapUser,
                messages: []
            }

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async deleteUserOticById(id: number): Promise<IGenericResponse<UserOticResponseDto>> {
        try {
            const responseUser = await this.userRepository.deleteUserOticById(id);
            if (!responseUser) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `User-Otic with Id ${id} not found`
                })
            }
            const mapUser = mapper.map(responseUser, UserOticEntity, UserOticResponseDto);
            return {
                success: true,
                code: HttpStatus.OK,
                data: mapUser,
                messages: []
            }

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async findUserOticById(id: number): Promise<IGenericResponse<UserOticResponseDto>> {
        try {
            const responseUser = await this.userRepository.findUserOticById(id);
            if (!responseUser) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `User-Otic with Id ${id} not found`
                })
            }
            const mapUser = mapper.map(responseUser, UserOticEntity, UserOticResponseDto);

            return {
                success: true,
                code: HttpStatus.OK,
                data: mapUser,
                messages: []
            }

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async listAllUserOtics(): Promise<UserOticResponseDto[]> {
        const responseUsers = await this.userRepository.listAllUserOtics();

        const users = responseUsers.map(responseUser =>
            mapper.map(responseUser, UserOticEntity, UserOticResponseDto)
        );

        return users;
    }
}
