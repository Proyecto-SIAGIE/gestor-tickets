import { IGenericResponse } from "src/utils/generic";
import { TicketDetailRequestDto } from "../../application/dto/ticketDetailReq.dto";
import { TicketDetailResponseDto } from "../../application/dto/ticketDetailRes.dto";

export interface TicketDetailService {
    //registerTicketDetailByTicketId(ticketId: number, ticketDetail: TicketDetailRequestDto): Promise<TicketDetailResponseDto>;
    updateTicketDetailById(id: number, tdUpdate: TicketDetailRequestDto): Promise<IGenericResponse<TicketDetailResponseDto>>;
    deleteTicketDetailById(id: number): Promise<IGenericResponse<TicketDetailResponseDto>>;
    //findTicketDetailByTicketId(ticketId: number): Promise<TicketDetailResponseDto>;
}