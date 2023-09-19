import { IsBoolean, IsNotEmpty, IsNumber, IsString, IsUrl, isNotEmpty } from "class-validator";

export class PropertyDto {
	@IsNumber()
	id: number;

	@IsNotEmpty()
	@IsString()
	name: string;

	@IsBoolean()
	isList: boolean;

	@IsNumber()
	order: number;
}

export class ValuesDto {
	@IsNumber()
	id?: number;

	@IsNotEmpty()
	@IsString()
	value: string;

	@IsBoolean()
	isActive?: boolean;
}