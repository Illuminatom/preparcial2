import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class RolesDto {
    @IsString()
    @IsNotEmpty()
    readonly role_name: string;

    @IsOptional()
    @IsString()
    readonly description?: string;
}
