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

	mainImage?: number;

	category: IBaseType;
	images?: ProductImageDto[];
	descriptions?: ProductDescriptionDto[];
	properties?: ProductPropertiesDto[];
}



export class ProductImageDto {
	id: number;
	link: string;
	description: string;
}

export class ProductDescriptionDto {
	id: number;
	description: string;
	type: string;
}

export class ProductPropertiesDto {
	id: number;
	propertyId: number;
	value: string;
	valueId: number;
}