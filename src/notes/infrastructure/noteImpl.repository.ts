import { TicketEntity } from "src/ticket/domain/model/ticket.entity";
import { NoteEntity } from "../domain/model/note.entity";
import { NoteRepository } from "../domain/note.repository";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ErrorManager } from "src/utils/errors/error.manager";

export class NoteImplRepository implements NoteRepository {
    constructor(
        @InjectRepository(NoteEntity)
        private readonly noteOrmRepository: Repository<NoteEntity>,
        @InjectRepository(TicketEntity)
        private readonly ticketOrmRepository: Repository<TicketEntity>,
    ){}
    
    async createNoteByTicketId(ticketId: number, note: NoteEntity): Promise<NoteEntity> {
        const ticket = await this.ticketOrmRepository.findOneBy({id: ticketId});
        if(!ticket){
            throw new ErrorManager({
                type: 'NOT_FOUND',
                message: `Ticket with Id ${ticketId} not found`
            })
        }

        note.ticket = ticket;
        const notePreload = this.noteOrmRepository.create(note);
        const resultNote = await this.noteOrmRepository.save(notePreload);
        return resultNote;
    }

    async updateNoteById(id: number, noteUpdate: NoteEntity): Promise<NoteEntity> {
        const note = await this.noteOrmRepository.findOneBy({id: id});
        if (!note) return null;

        const notePreload = await this.noteOrmRepository.preload({
            id: note.id,
            ticket: note.ticket,
            ...noteUpdate
        })
        const noteUpdated = await this.noteOrmRepository.save(notePreload);
        return noteUpdated;
    }
    
    async deleteNoteById(id: number): Promise<NoteEntity> {
        const note = await this.noteOrmRepository.findOneBy({id: id});
        if(!note) return null;
        const resultNote =  await this.noteOrmRepository.remove(note);
        return resultNote;
    }
    
    async findNoteById(id: number): Promise<NoteEntity> {
        const note = await this.noteOrmRepository.findOne({where: {id: id}, relations:['ticket']});
        return note;
    }
    
    async findNotesByTicketId(ticketId: number): Promise<NoteEntity[]> {
        const notes = await this.noteOrmRepository.findBy({ticket:{id: ticketId}});
        return notes;
    }
    
    async listAllNotes(): Promise<NoteEntity[]> {
        const notes = await this.noteOrmRepository.findBy({});
        return notes;
    }

}