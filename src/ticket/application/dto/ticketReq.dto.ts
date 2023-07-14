import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt,
    IsPositive,
    IsString,
    Matches,
    MaxLength,
    MinLength } from "class-validator";

export class TicketRequestDto {
    
    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(500)
    @AutoMap()
    description: string;

    @ApiProperty()
    @IsString()
    @Matches(/^\d{8}$/)
    @AutoMap()
    studentDNI: string;

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
    @IsPositive()
    @AutoMap()
    subcategory2Id: number;

    @ApiProperty()
    @IsInt()
    @IsPositive()
    @AutoMap()
    subcategory3Id: number;
    
    @ApiProperty()
    @IsInt()
    @IsPositive()
    @AutoMap()
    userExternalId: number;
    
    @ApiProperty()
    @IsInt()
    @IsPositive()
    @AutoMap()
    iieeId: number;
}