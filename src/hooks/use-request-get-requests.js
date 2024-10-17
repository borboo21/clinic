import { useDispatch } from 'react-redux';
import { ACTION_TYPE } from '../actions';
import { URL } from '../constants/url';
import { useEffect } from 'react';

export const fetchRequests = () => {
	return (dispatch) => {
		const token = window.localStorage.token;
		fetch(URL.REQUESTS, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		})
			.then((loadedData) => loadedData.json())
			.then((loadedRequests) => {
				dispatch({ type: ACTION_TYPE.GET_DATA, payload: loadedRequests });
			});
	};
};

export const useRequestGetRequests = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchRequests());
	}, [dispatch]);
};
