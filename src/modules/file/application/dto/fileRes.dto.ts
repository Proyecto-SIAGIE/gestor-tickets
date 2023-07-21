import { AutoMap } from "@automapper/classes";

export class FileResponseDto {
    
    @AutoMap()
    id: number;

    @AutoMap()
    name: string;

    @AutoMap()
    size: number;

    @AutoMap()
    date: Date;

    @AutoMap()
    path: string;

    @AutoMap()
    ticketId: number;
}