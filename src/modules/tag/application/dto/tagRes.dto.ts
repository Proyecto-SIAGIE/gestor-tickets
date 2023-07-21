import { AutoMap } from "@automapper/classes";

export class TagResponseDto {
    
    @AutoMap()
    id: number;

    @AutoMap()
    name: string;
}