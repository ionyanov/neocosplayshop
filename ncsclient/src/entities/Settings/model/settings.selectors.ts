import { StateSchema } from "@/app/providers/StoreProvider";
import { Settings } from "@/shared/types/settings";

export function getSettingsIsInit(state: StateSchema): boolean {
	return state?.settings?.isInit ?? false;
}

export function getSettings(state: StateSchema): Record<Settings, string> | undefined {
	return state?.settings?.settings;
}