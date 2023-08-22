/*
https://docs.nestjs.com/providers#services
*/

import { HttpStatus, Injectable } from '@nestjs/common';
import { FileRequestDto } from '../dto/fileReq.dto';
import { FileResponseDto } from '../dto/fileRes.dto';
import { mapper } from 'src/utils/mapping/mapper';
import { ErrorManager } from 'src/utils/errors/error.manager';
import { FileService } from '../../domain/file.service';
import { FileEntity } from '../../domain/model/file.entity';
import { FileImplRepository } from '../../infrastructure/fileImpl.repository';
import { IGenericResponse } from 'src/utils/interface/generic';



@Injectable()
export class FileImplService implements FileService {
    constructor(private readonly fileRepository: FileImplRepository){}
    
    /*
    async registerFileByTicketId(ticketId: number, file: FileRequestDto): Promise<FileResponseDto> {
        try{
            const fileEntity = mapper.map(file, FileRequestDto, FileEntity);
            const responseFile = await this.fileRepository.createFileByTicketId(ticketId, fileEntity);
           
            return mapper.map(responseFile, FileEntity, FileResponseDto);

        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async registerFileByNoteId(noteId: number, file: FileRequestDto): Promise<FileResponseDto> {
        throw new Error('Method not implemented.');
    }
    */
    async updateFileById(id: number, fileUpdate: FileRequestDto): Promise<IGenericResponse<FileResponseDto>> {
        try{
            const fileEntity = mapper.map(fileUpdate, FileRequestDto, FileEntity);
            const responseFile = await this.fileRepository.updateFileById(id, fileEntity);
            if (!responseFile) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `File with Id ${id} not found`
                })
            }

            const mapFile = mapper.map(responseFile, FileEntity, FileResponseDto);
            return {
                success: true,
                data: mapFile,
                messages: [''],
                code: HttpStatus.ACCEPTED
            }
        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async deleteFileById(id: number): Promise<IGenericResponse<FileResponseDto>> {
        try {
            const responseFile = await this.fileRepository.deleteFileById(id);
            if (!responseFile) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `File with Id ${id} not found`
                })
            }
            const mapFile = mapper.map(responseFile, FileEntity, FileResponseDto);
            
            return {
                success: true,
                data: mapFile,
                messages: ['File successfull removed'],
                code: HttpStatus.OK
            };

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async findFileById(id: number): Promise<IGenericResponse<FileResponseDto>> {
        try {
            const responseFile = await this.fileRepository.findFileById(id);
            if (!responseFile) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `File with Id ${id} not found`
                })
            }
            const mapFile = mapper.map(responseFile, FileEntity, FileResponseDto);
            mapFile.ticketId = responseFile.ticket.id;

            return {
                success: true,
                data: mapFile,
                messages: ['File successfull founded'],
                code: HttpStatus.OK
            };

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async findFilesByTicketId(ticketId: number): Promise<FileResponseDto[]> {
        const responseFiles = await this.fileRepository.findFilesByTicketId(ticketId);

        const files = responseFiles.map(responseFile =>
            mapper.map(responseFile, FileEntity, FileResponseDto)
        );

        return files;
    }
    
    async listAllFiles(): Promise<FileResponseDto[]> {
        const responseFiles = await this.fileRepository.listAllFiles();

        const files = responseFiles.map(responseFile =>
            mapper.map(responseFile, FileEntity, FileResponseDto)
        );

        return files;
    }
}
