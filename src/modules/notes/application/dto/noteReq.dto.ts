import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class NoteRequestDto {
    
    @ApiProperty()
    @AutoMap()
    @IsNumber()
    @IsPositive()
    techId: number;
    
    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    techName: string;
    
    @ApiProperty()
    @AutoMap()
    @IsDateString()
    date: Date;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    comment: string;

    @ApiProperty()
    @AutoMap()
    @IsBoolean()
    isPrivate: boolean;
}