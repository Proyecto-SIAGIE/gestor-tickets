import { AutoMap } from "@automapper/classes";

export class IieeResponseDto {
    
    @AutoMap()
    id: number;

    @AutoMap()
    name: string;

    @AutoMap()
    modularCode: string;

    @AutoMap()
    dreName: string;

    @AutoMap()
    ugelName: string;

    @AutoMap()
    address: string;
}