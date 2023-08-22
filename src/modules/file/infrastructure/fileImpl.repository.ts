import { InjectRepository } from "@nestjs/typeorm";
import { FileRepository } from "../domain/interface/file.repository";
import { FileEntity } from "../domain/model/file.entity";
import { Repository } from "typeorm";
import { ErrorManager } from "src/utils/errors/error.manager";
import { NoteEntity } from "src/modules/notes/domain/model/note.entity";
import { TicketEntity } from "src/modules/ticket/domain/model/ticket.entity";


export class FileImplRepository implements FileRepository {
    constructor(
        @InjectRepository(FileEntity)
        private readonly fileOrmRepository: Repository<FileEntity>,
        @InjectRepository(TicketEntity)
        private readonly ticketOrmRepository: Repository<TicketEntity>,
        @InjectRepository(NoteEntity)
        private readonly noteOrmRepository: Repository<NoteEntity>,
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
        const note = await this.noteOrmRepository.findOneBy({id: noteId});
        if(!note){
            throw new ErrorManager({
                type: 'NOT_FOUND',
                message: `Note with Id ${noteId} not found`
            })
        }

        file.note = note;
        const filePreload = this.fileOrmRepository.create(file);
        const resultFile = await this.fileOrmRepository.save(filePreload);
        return resultFile;
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
        const file = await this.fileOrmRepository.findOne({where: {id: id}, relations:['ticket']});
        return file;
    }
    
    async findFilesByTicketId(ticketId: number): Promise<FileEntity[]> {
        const files = await this.fileOrmRepository.findBy({ticket:{id: ticketId}});
        return files;
    }

    async findFilesByNoteId(noteId: number): Promise<FileEntity[]> {
        const files = await this.fileOrmRepository.findBy({note:{id: noteId}});
        return files;
    }
    
    async listAllFiles(): Promise<FileEntity[]> {
        return await this.fileOrmRepository.find();
    }

}