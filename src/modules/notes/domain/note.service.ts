
import { FileRequestDto } from "src/modules/file/application/dto/fileReq.dto";
import { FileResponseDto } from "src/modules/file/application/dto/fileRes.dto";
import { NoteRequestDto } from "../application/dto/noteReq.dto";
import { NoteResponseDto } from "../application/dto/noteRes.dto";


export interface NoteService {
    
    registerFileByNoteId(noteId: number, file: FileRequestDto): Promise<FileResponseDto>;
    findFilesByNoteId(noteId: number): Promise<FileResponseDto[]>;
    updateNoteById(id: number, noteUpdate: NoteRequestDto): Promise<NoteResponseDto>;
    deleteNoteById(id: number): Promise<NoteResponseDto>;
    findNoteById(id: number):Promise<NoteResponseDto | null>;
    listAllNotes():Promise<NoteResponseDto[]>;
}