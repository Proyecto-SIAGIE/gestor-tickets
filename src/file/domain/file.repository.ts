import { FileEntity } from "./model/file.entity";

export interface FileRepository {
    createFileByTicketId(ticketId: number, file: FileEntity): Promise<FileEntity>;
    createFileByNoteId(noteId: number, file: FileEntity): Promise<FileEntity>;
    updateFileById(id: number, fileUpdate: FileEntity): Promise<FileEntity>;
    deleteFileById(id: number): Promise<FileEntity>;
    findFileById(id: number):Promise<FileEntity | null>;
    findFilesByTicketId(ticketId: number):Promise<FileEntity[]>;
    listAllFiles():Promise<FileEntity[]>;
}