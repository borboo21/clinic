import { useDispatch } from 'react-redux';
import { requestAddRequest } from '../../hooks';
import { useForm } from 'react-hook-form';
import styles from './Form.module.css';

export const Form = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		fullName: '',
		phoneNumber: '',
		problem: '',
	});

	const dispatch = useDispatch();

	const onSubmit = (values) => {
		dispatch(requestAddRequest(values));
		reset();
	};

	return (
		<div className={styles.main}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<span className={styles.reg}>Запись ко врачу</span>
				<div className={styles.errorsBlock}>
					<span className={styles.errorLabel}>{errors.fullName?.message}</span>
				</div>
				<input
					className={styles.input}
					placeholder="ФИО"
					id="fullName"
					{...register('fullName', {
						required: 'Поле обязательно к заполнению',
						minLength: {
							value: 5,
							message: 'Минимум 5 символов',
						},
						pattern: {
							value: /^[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+$/,
							message:
								'Введите полное ФИО (например, Иванов Иван Иванович)',
						},
					})}
				/>
				<div className={styles.errorsBlock}>
					<span className={styles.errorLabel}>
						{errors.phoneNumber?.message}
					</span>
				</div>
				<input
					className={styles.input}
					placeholder="Номер телефона"
					id="phoneNumber"
					{...register('phoneNumber', {
						required: 'Поле обязательно к заполнению',
						pattern: {
							value: /^\+7\d{3}\d{3}\d{2}\d{2}$/,
							message: 'Введите номер в формате +7XXXXXXXXXX',
						},
					})}
				/>
				<div className={styles.errorsBlock}>
					<span className={styles.errorLabel}>{errors.problem?.message}</span>
				</div>
				<textarea
					className={styles.textAreaProblem}
					placeholder="Опишите вашу проблему"
					id="problem"
					{...register('problem', {
						required: 'Поле обязательно к заполнению',
					})}
				></textarea>
				<button className={styles.btn} type="submit">
					Отправить
				</button>
			</form>
		</div>
	);
};
