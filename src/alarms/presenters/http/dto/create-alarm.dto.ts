import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

class CreateAlarmItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}

export class CreateAlarmDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  severity: string;

  @IsDateString()
  triggeredAt: Date;

  @ValidateNested({ each: true })
  @Type(() => CreateAlarmItemDto)
  items: Array<{
    name: string;
    type: string;
  }>;
}
