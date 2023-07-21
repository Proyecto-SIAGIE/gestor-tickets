import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsPositive } from "class-validator";

export class FileRequestDto {

    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    name:string;

    @ApiProperty()
    @IsPositive()
    @AutoMap()
    size: number;

    @ApiProperty()
    @IsDateString()
    @AutoMap()
    date: Date;

    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    path: string;
}