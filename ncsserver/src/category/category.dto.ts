import { IsBoolean, IsNotEmpty, IsNumber, IsString, IsUrl, isNotEmpty } from "class-validator";

export class CategoryDto {
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    link: string;

    @IsBoolean()
    visible: boolean;

    @IsNotEmpty()
    @IsNumber()
    order: number;
}
