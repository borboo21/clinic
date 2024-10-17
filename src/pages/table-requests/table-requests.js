import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { emailSelector, requestsSelector } from '../../selectors';
import { ACTION_TYPE } from '../../actions';
import { useRequestGetRequests } from '../../hooks';
import style from './table-requests.module.css';

export const TableRequests = () => {
	const dispatch = useDispatch();
	const email = useSelector(emailSelector);
	const data = useSelector(requestsSelector);
	useRequestGetRequests();

	const handleClick = () => {
		dispatch({ type: ACTION_TYPE.LOGOUT });
		window.localStorage.clear();
	};

	if (!window.localStorage.token) {
		return <Navigate to="/login" />;
	}

	return (
		<div className={style.main}>
			<div className={style.header}>
				<span>Добро пожаловать, {email}</span>
				<button className={style.btn} onClick={handleClick}>
					Выйти
				</button>
			</div>
			<div className={style.tableDiv}>
				<table className={style.table}>
					<thead>
						<tr>
							<th className={style.headerTable}>Дата отправки</th>
							<th className={style.headerTable}>ФИО</th>
							<th className={style.headerTable}>Телефон</th>
							<th className={style.headerTable}>Проблема</th>
						</tr>
					</thead>
					<tbody>
						{data.map((item) => (
							<tr key={item._id}>
								<td className={style.body}>
									{item.createdAt
										.replace(/-/g, '.')
										.slice(0, -14)
										.split('.')
										.reverse()
										.join('.') +
										' ' +
										item.createdAt.slice(11, 16)}
								</td>
								<td className={style.body}>{item.fullName}</td>
								<td className={style.body}>{item.phoneNumber}</td>
								<td className={style.body}>{item.problem}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
