import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IBaseType } from "src/prisma.service";

export class ProductDto {
	@IsNumber()
	id: number;

	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNumber()
	price?: number;

	@IsBoolean()
	isPopular: boolean;
	@IsBoolean()
	isOnsales: boolean;

	mainImageId?: number;

	category: IBaseType;
}
