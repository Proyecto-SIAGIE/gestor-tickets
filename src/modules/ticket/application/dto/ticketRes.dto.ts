import { AutoMap } from "@automapper/classes";
import { TicketDetailResponseDto } from "src/modules/ticket-detail/application/dto/ticketDetailRes.dto";

export class TicketResponseDto {

    @AutoMap()
    id: number

    @AutoMap()
    description: string;

    

    @AutoMap()
    categoryId: number;

    @AutoMap()
    subcategory1Id: number;

    @AutoMap()
    subcategory2Id: number;

    @AutoMap()
    subcategory3Id: number;
    
    @AutoMap()
    iieeId: number;
    
    @AutoMap()
    userExternalId: number;

    @AutoMap()
    ticketDetail: TicketDetailResponseDto;
}