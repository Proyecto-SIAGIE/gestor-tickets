import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";

export class TicketResponseDto {

    @AutoMap()
    id: number

    @AutoMap()
    description: string;

    @AutoMap()
    studentDNI: string;

    @AutoMap()
    categoryId: number;

    @AutoMap()
    subcategory1Id: number;

    @AutoMap()
    subcategory2Id: number;

    @AutoMap()
    subcategory3Id: number;
    
    @AutoMap()
    userExternalId: number;
    
    @AutoMap()
    iieeId: number;
}