import { IsArray, IsDateString, IsOptional } from 'class-validator';

export class UpdateAppointmentDto {
  @IsDateString()
  @IsOptional()
  start: Date;

  @IsDateString()
  @IsOptional()
  end: Date;

  @IsArray()
  @IsOptional()
  users: string[];
}
