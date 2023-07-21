import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class RoleRequestDto {

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @AutoMap()
    name: string;
}