import { ACTION_TYPE } from '../actions';
import { URL } from '../constants/url';

export const fetchLogin = (req) => {
	return (dispatch) => {
		fetch(URL.LOGIN, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(req),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				dispatch({ type: ACTION_TYPE.LOGIN, payload: response });
				console.log(response);
				return response;
			});
	};
};
