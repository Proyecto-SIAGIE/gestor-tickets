import { InjectRepository } from "@nestjs/typeorm";
import { FileRepository } from "../domain/file.repository";
import { FileEntity } from "../domain/model/file.entity";
import { Repository } from "typeorm";
import { TicketEntity } from "src/ticket/domain/model/ticket.entity";
import { ErrorManager } from "src/utils/errors/error.manager";

export class FileImplRepository implements FileRepository {
    constructor(
        @InjectRepository(FileEntity)
        private readonly fileOrmRepository: Repository<FileEntity>,
        @InjectRepository(TicketEntity)
        private readonly ticketOrmRepository: Repository<TicketEntity>,
    ){}
    
    async createFileByTicketId(ticketId: number, file: FileEntity): Promise<FileEntity> {
        const ticket = await this.ticketOrmRepository.findOneBy({id: ticketId});
        if(!ticket){
            throw new ErrorManager({
                type: 'NOT_FOUND',
                message: `Ticket with Id ${ticketId} not found`
            })
        }

        file.ticket = ticket;
        const filePreload = this.fileOrmRepository.create(file);
        const resultFile = await this.fileOrmRepository.save(filePreload);
        return resultFile;
    }
    
    async createFileByNoteId(noteId: number, file: FileEntity): Promise<FileEntity> {
        throw new Error("Method not implemented.");
    }

    /*async createFile(file: FileEntity): Promise<FileEntity> {
        const filePreload = this.fileOrmRepository.create(file);
        const resultFile = await this.fileOrmRepository.save(filePreload);
        return resultFile;
    }*/
    
    async updateFileById(id: number, fileUpdate: FileEntity): Promise<FileEntity> {
        const file = await this.fileOrmRepository.findOneBy({id: id});
        if (!file) return null;

        const filePreload = await this.fileOrmRepository.preload({
            id: file.id,
            ticket: file.ticket,
            ...fileUpdate
        })
        const fileUpdated = await this.fileOrmRepository.save(filePreload);
        return fileUpdated;
    }
    
    async deleteFileById(id: number): Promise<FileEntity> {
        const file = await this.fileOrmRepository.findOneBy({id: id});
        if(!file) return null;
        const resultFile =  await this.fileOrmRepository.remove(file);
        return resultFile;
    }
    
    async findFileById(id: number): Promise<FileEntity> {
        const ticket = await this.fileOrmRepository.findOne({where: {id: id}, relations:['ticket']});
        return ticket;
    }
    
    async findFilesByTicketId(ticketId: number): Promise<FileEntity[]> {
        const tickets = await this.fileOrmRepository.findBy({ticket:{id: ticketId}});
        return tickets;
    }
    
    async listAllFiles(): Promise<FileEntity[]> {
        return await this.fileOrmRepository.find();
    }

}