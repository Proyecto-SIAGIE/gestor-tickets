import { FileRequestDto } from "../application/dto/fileReq.dto";
import { FileResponseDto } from "../application/dto/fileRes.dto";

export interface FileService {
    //registerFile(file: FileRequestDto): Promise<FileResponseDto>;
    
    updateFileById(id: number, fileUpdate: FileRequestDto): Promise<FileResponseDto>;
    deleteFileById(id: number): Promise<FileResponseDto>;
    findFileById(id: number):Promise<FileResponseDto | null>;
    listAllFiles():Promise<FileResponseDto[]>;
}