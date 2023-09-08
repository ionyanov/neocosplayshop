import { IsEnum, IsString } from "class-validator";

export class SettingsDto {
    @IsString()
    name: string;

    @IsString()
    value: string;
}
