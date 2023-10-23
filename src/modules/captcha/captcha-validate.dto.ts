import { ApiProperty } from "@nestjs/swagger";

export class CaptchaValidateDTO {
    @ApiProperty()
    value: string;

    @ApiProperty()
    key: string;
}