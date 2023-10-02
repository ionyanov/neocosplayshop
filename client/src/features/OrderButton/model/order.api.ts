import { rtkAPI } from '@/shared/api/rtkAPI';
import { IOrderRequest } from './order.type';

const orderApi = rtkAPI.injectEndpoints({
	endpoints: (build) => ({
		makeOrder: build.mutation<void, IOrderRequest>({
			query: (data) => ({
				url: `/makeorder`,
				method: 'POST',
				body: data
			}),
		}),
	}),
});

export const { useMakeOrderMutation } = orderApi
