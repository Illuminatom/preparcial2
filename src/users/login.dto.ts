import { IsBoolean, IsDate, IsEmail, IsHash, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID } from "class-validator";

export class LogInDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail({}, {message: "Email Invalido"})
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}