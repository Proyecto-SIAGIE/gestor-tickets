import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive, isNotEmpty } from "class-validator";

export class TicketDetailRequestDto {
    
    @ApiProperty()
    @AutoMap()
    @IsDateString()
    date: Date;

    @ApiProperty()
    @AutoMap()
    @IsDateString()
    dateMod: Date;

    @ApiProperty()
    @AutoMap()
    @IsNumber()
    @IsPositive()
    assignedTechId: number;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    assignedTechName: string;

    @ApiProperty()
    @IsOptional()
    @AutoMap()
    solveDate: Date;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    source: string;

    @ApiProperty()
    @AutoMap()
    @IsNumber()
    @IsPositive()
    status: number;

    @ApiProperty()
    @AutoMap()
    @IsNumber()
    @IsPositive()
    priority: number;

    @ApiProperty()
    @AutoMap()
    @IsNumber()
    @IsPositive()
    impact: number;

    @ApiProperty()
    @AutoMap()
    @IsNumber()
    @IsPositive()
    urgency: number;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    summary: string;

    @ApiProperty()
    @AutoMap()
    modality: string;

    @ApiProperty()
    @AutoMap()
    @IsNumber()
    @IsPositive()
    type: number;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    process: string;

    @ApiProperty()
    @AutoMap()
    usiStatus: number;
}