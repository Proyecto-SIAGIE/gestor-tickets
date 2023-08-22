import { NoteEntity } from "../model/note.entity";

export interface NoteRepository {
    createNoteByTicketId(ticketId: number, note: NoteEntity): Promise<NoteEntity>;
    updateNoteById(id: number, fileUpdate: NoteEntity): Promise<NoteEntity>;
    deleteNoteById(id: number): Promise<NoteEntity>;
    findNoteById(id: number):Promise<NoteEntity | null>;
    findNotesByTicketId(ticketId: number):Promise<NoteEntity[]>;
    listAllNotes():Promise<NoteEntity[]>;
}