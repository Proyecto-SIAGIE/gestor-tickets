import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class IieeRequestDto {

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    @IsNumberString()
    modularCode: string;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    dreName: string;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    ugelName: string;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    address: string;
}