import { IieeRequestDto } from "../application/dto/iieeReq.dto";
import { IieeResponseDto } from "../application/dto/iieeRes.dto";

export interface IieeService {
    registerIiee(iiee: IieeRequestDto): Promise<IieeResponseDto>;
    updateIieeById(id: number, iieeRequest: IieeRequestDto):Promise<IieeResponseDto>;
    deleteIieeById(id: number):Promise<IieeResponseDto>;
    findIieeById(id: number):Promise<IieeResponseDto | null>;
    listAllIiees():Promise<IieeResponseDto[]>
}