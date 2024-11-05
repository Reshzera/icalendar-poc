import { IsArray, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateAppointmentDto {
  @IsDateString()
  @IsNotEmpty()
  start: Date;

  @IsDateString()
  @IsNotEmpty()
  end: Date;

  @IsArray()
  @IsNotEmpty()
  users: string[];
}
