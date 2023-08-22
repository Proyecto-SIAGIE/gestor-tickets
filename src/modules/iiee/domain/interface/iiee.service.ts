import { IGenericResponse } from "src/utils/generic";
import { IieeRequestDto } from "../../application/dto/iieeReq.dto";
import { IieeResponseDto } from "../../application/dto/iieeRes.dto";
import { TicketResponseDto } from "src/modules/ticket/application/dto/ticketRes.dto";

export interface IieeService {
    registerIiee(iiee: IieeRequestDto): Promise<IGenericResponse<IieeResponseDto>>;
    updateIieeById(id: number, iieeRequest: IieeRequestDto):Promise<IGenericResponse<IieeResponseDto>>;
    deleteIieeById(id: number):Promise<IGenericResponse<IieeResponseDto>>;
    findIieeById(id: number):Promise<IGenericResponse<IieeResponseDto>>;
    assignIieeToTicket(iieeId: number, ticketId: number): Promise<IGenericResponse<TicketResponseDto>>;
    listAllIiees():Promise<IieeResponseDto[]>
}