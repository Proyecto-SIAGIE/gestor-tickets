import { IGenericResponse } from "src/utils/generic";
import { FileRequestDto } from "../../application/dto/fileReq.dto";
import { FileResponseDto } from "../../application/dto/fileRes.dto";

export interface FileService {
    //registerFile(file: FileRequestDto): Promise<FileResponseDto>;
    
    updateFileById(id: number, fileUpdate: FileRequestDto): Promise<IGenericResponse<FileResponseDto>>;
    deleteFileById(id: number): Promise<IGenericResponse<FileResponseDto>>;
    findFileById(id: number):Promise<IGenericResponse<FileResponseDto>>;
    listAllFiles():Promise<FileResponseDto[]>;
}