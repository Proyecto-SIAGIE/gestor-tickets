import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
  min,
} from 'class-validator';

export class UserExternalRequestDto {

  @ApiProperty()
  @IsPositive()
  @AutoMap()
  passportUserId: number;

  @ApiProperty()
  @IsNotEmpty()
  @AutoMap()
  username: string;

  @ApiProperty()
  @IsNumberString()
  @MinLength(8, {
    message: 'The DNI must have 8 digits',
  })
  @AutoMap()
  dni: string;

  @ApiProperty()
  @IsNotEmpty()
  @AutoMap()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @AutoMap()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @AutoMap()
  email: string;

  @ApiProperty()
  @IsNumberString()
  @MinLength(9, {
    message: 'The phone must have 9 digits',
  })
  @AutoMap()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  @AutoMap()
  phoneExt: string;
}
