import { AutoMap } from "@automapper/classes";

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
    iieeId: number;
    
    @AutoMap()
    userExternalId: number;
}