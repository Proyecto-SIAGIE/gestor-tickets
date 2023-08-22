
import { FileRequestDto } from "src/modules/file/application/dto/fileReq.dto";
import { FileResponseDto } from "src/modules/file/application/dto/fileRes.dto";
import { NoteRequestDto } from "../../application/dto/noteReq.dto";
import { NoteResponseDto } from "../../application/dto/noteRes.dto";
import { IGenericResponse } from "src/utils/generic";


export interface NoteService {
    
    registerFileByNoteId(noteId: number, file: FileRequestDto): Promise<IGenericResponse<FileResponseDto>>;
    findFilesByNoteId(noteId: number): Promise<FileResponseDto[]>;
    updateNoteById(id: number, noteUpdate: NoteRequestDto): Promise<IGenericResponse<NoteResponseDto>>;
    deleteNoteById(id: number): Promise<IGenericResponse<NoteResponseDto>>;
    findNoteById(id: number):Promise<IGenericResponse<NoteResponseDto>>;
    listAllNotes():Promise<NoteResponseDto[]>;
}