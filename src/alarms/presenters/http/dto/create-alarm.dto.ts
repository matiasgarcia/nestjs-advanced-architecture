import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAlarmDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  severity: string;

  triggeredAt: Date;

  items: Array<{
    name: string;
    type: string;
  }>;
}
