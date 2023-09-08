import { StateSchema } from "@/app/providers/StoreProvider";
import {MenuType} from "./menu.type";

export function getMenuIsInit(state: StateSchema): boolean {
	return state?.menu?.isInit ?? false;
}

export function getMenu(state: StateSchema): MenuType[] | undefined {
	return state?.menu?.menu;
}