import { ApiProperty } from "@nestjs/swagger";

export class IIEEPadronDto {
    @ApiProperty()
    anexo: string;
    @ApiProperty()
    nivel: string;
}