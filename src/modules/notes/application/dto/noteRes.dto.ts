import { AutoMap } from "@automapper/classes";

export class NoteResponseDto {

    @AutoMap()
    id: number;

    @AutoMap()
    techId: number;

    @AutoMap()
    techName: string;
    
    @AutoMap()
    date: Date;

    @AutoMap()
    comment: string;

    @AutoMap()
    isPrivate: boolean;

    @AutoMap()
    ticketId: number;
}