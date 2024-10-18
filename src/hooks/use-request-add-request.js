import { ACTION_TYPE } from '../actions';
import { URL } from '../constants/url';

export const requestAddRequest = (req) => {
	return (dispatch) => {
		fetch(URL.FORM, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(req),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				dispatch({ type: ACTION_TYPE.POST_DATA, payload: response });
			})
			.finally(alert('Заявка успешно отправлена'));
	};
};
