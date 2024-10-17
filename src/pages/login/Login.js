import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { fetchLogin } from '../../hooks';
import { tokenSelector } from '../../selectors';
import styles from './Login.module.css';

export const Login = () => {
	const token = useSelector(tokenSelector);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const dispatch = useDispatch();

	const onSubmit = (values) => {
		dispatch(fetchLogin(values));
	};

	if (token) {
		window.localStorage.setItem('token', token);
	}

	if (window.localStorage.token) {
		return <Navigate to="/requests" />;
	}

	return (
		<div className={styles.main}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<span className={styles.reg}>Логин</span>
				<div className={styles.errorsBlock}>
					<span className={styles.errorLabel}>{errors.email?.message}</span>
				</div>
				<input
					className={styles.input}
					type="email"
					name="email"
					placeholder="Почта"
					{...register('email', { required: 'Укажите почту' })}
				/>
				<div className={styles.errorsBlock}>
					<span className={styles.errorLabel}>{errors.password?.message}</span>
				</div>
				<input
					className={styles.input}
					type="password"
					name="password"
					placeholder="Пароль"
					{...register('password', { required: 'Укажите пароль' })}
				/>
				<button className={styles.btn} type="submit">
					Войти
				</button>
			</form>
		</div>
	);
};
