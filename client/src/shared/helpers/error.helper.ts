import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

type ErrorType = FetchBaseQueryError | SerializedError | undefined;

export function errorsToString(args: ErrorType[]): string {
	return args.map(err => err?.data ?? err).join('');
}