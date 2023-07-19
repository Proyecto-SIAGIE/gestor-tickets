import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UserOticRequestDto {
  

  @ApiProperty()
  @IsNotEmpty()
  @AutoMap()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @AutoMap()
  email: string;
}
