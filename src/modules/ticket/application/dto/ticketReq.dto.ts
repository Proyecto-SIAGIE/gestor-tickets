import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt,
    IsNotEmpty,
    IsOptional,
    IsPositive,
    IsString,
    Matches,
    MaxLength,
    MinLength } from "class-validator";

export class TicketRequestDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(500)
    @AutoMap()
    description: string;

    //@ApiProperty()
    //@IsString()
    /*@MinLength(8, {
        message: 'The DNI must have 8 digits',
    })*/
   

    @ApiProperty()
    @IsInt()
    @IsPositive()
    @AutoMap()
    categoryId: number;

    @ApiProperty()
    @IsInt()
    @IsPositive()
    @AutoMap()
    subcategory1Id: number;

    @ApiProperty()
    @IsInt()
    @IsOptional()
    @AutoMap()
    subcategory2Id: number;

    @ApiProperty()
    @IsInt()
    @IsOptional()
    @AutoMap()
    subcategory3Id: number;

}