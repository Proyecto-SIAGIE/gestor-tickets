import { AutoMap } from "@automapper/classes";

export class RoleResponseDto {

    @AutoMap()
    id: number
    
    @AutoMap()
    name: string
}