/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_IS_DEV_: string
	readonly VITE_API_URL_: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}