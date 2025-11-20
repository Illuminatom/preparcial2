import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export enum status {
  pending = 'pending',
  cancelled = 'cancelled',
  done = 'done',
}

export class AppointmentsDto {
    @IsDate()
    @IsNotEmpty()
    datetime: Date

    @IsString()
    @IsNotEmpty()
    @IsEnum(status)
    status: string
}