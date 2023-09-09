import { StateSchema } from "@/app/providers/StoreProvider";
import { CategoryType } from "./category.type";

export function getCategoriesIsInit(state: StateSchema): boolean {
	return state?.category?.isInit ?? false;
}

export function getCategoriesError(state: StateSchema): string {
	return state?.category?.error ?? '';
}


export function getCategories(state: StateSchema): CategoryType[] | undefined {
	return state?.category?.categories;
}