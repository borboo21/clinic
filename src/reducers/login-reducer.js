import { ACTION_TYPE } from '../actions';

const initialLoginState = {
	email: null,
	token: null,
};

export const loginReducer = (state = initialLoginState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGIN:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.LOGOUT:
			return {
				initialLoginState,
			};
		default:
			return state;
	}
};
