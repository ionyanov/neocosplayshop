import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

type ErrorType = FetchBaseQueryError | SerializedError | undefined;

export function errorsToString(args: ErrorType[]): string {
	return args.map(err => {
		if (typeof err == 'object' && err)
			if ('data' in err)
				return err.data
			else
				return err
		return err
	}).join('');
}