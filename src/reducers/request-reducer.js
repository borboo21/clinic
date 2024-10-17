import { ACTION_TYPE } from '../actions';

const initialRequestState = {
	requests: [],
};

export const requestReducer = (state = initialRequestState, action) => {
	switch (action.type) {
		case ACTION_TYPE.POST_DATA:
			return {
				...state,
				requests: [...state.requests, action.payload],
			};
		case ACTION_TYPE.GET_DATA:
			return {
				...state,
				requests: action.payload,
			};
		default:
			return state;
	}
};
