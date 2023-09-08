import { IsUrl } from "class-validator";

export class CategoryDto {
    id: number;
    name: string;
    link: string;
    visible: boolean;
    order: number;
}
