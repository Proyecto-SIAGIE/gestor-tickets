import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class TicketGlpiReq {
    @ApiProperty()
    //@IsInt()
    //@IsPositive()
    userId: number;

    @ApiProperty()
    //@IsInt()
    //@IsPositive()
    ticketId: number;

    @ApiProperty()
    //@IsNotEmpty()
    iieeModularCode: string;
}