import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class TagRequestDto {

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    name: string;
}