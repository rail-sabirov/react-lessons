import { useEffect, useReducer } from 'react';
import cn from 'classnames';

import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { fromReducer, INITIAL_STATE } from './JournalForm.state';

function JournalForm({ addItem }) {

	// Используя useReducer
	const [formState, dispatchForm] = useReducer(fromReducer, INITIAL_STATE);

	// Диструктурируем наш стейт на составляющие, вынимаем isValid
	const { isValid, isFormReadyToSubmit, values } = formState;

	// -- Таймер на возврат форм из красного цвета после ошибки
	useEffect(() => {
		let timerId;

		if(!isValid.date || !isValid.post || !isValid.date) {
			
			// Возвращаем на началные настройки, при - return запуститься один раз
			timerId = setTimeout(() => {
				console.log('Clear state');

				// Отправляем, что нам нужно сделать вот такое событие
				dispatchForm({ type: 'RESET_VALIDITY' })
			}, 2000);
		}

		// Очистка эффекта, остановка таймера и остановка эффетка при множественном вызове
		return () => {
			clearTimeout(timerId);
		};
	}, 
	// Подписываемся на изменение валидности полей
	[ isValid ]);


	// -- Если форма готова и проверяна, то можно отправлять вызовом функции addItem
	useEffect(() => {
		if (isFormReadyToSubmit === true) {
			// Вызываем прокинутую в компонент функцию для добавления данных
			addItem(values);

			// Отправляем сигнал для очистки полей формы
			dispatchForm({ type: 'CLEAR' });
		}
	}, [ isFormReadyToSubmit, values, addItem ]);


	// Добавление записи в журнал
	const addJournalItem = (event) => {
		event.preventDefault();

		// Объект для работы с формой в виде ключ-значение
		const formData = new FormData(event.target);

		// Получаем все значения из формы в виде объекта
		const formProps = Object.fromEntries(formData);
        
		// Посылаем флаг "Отправляй" и данные формы
		dispatchForm({ type: 'SUBMIT', payload: formProps })
	};

	// Функция для контроля изменений полей формы - для избавления от submit
	const onChangeFormFields = (event) => {
		const { name, value } = event.target;
		dispatchForm({ type: 'SET_VALUE', payload: { [name]: value }});
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<input
				type="text"
				className={ cn(
					styles['input-title'], 
					styles['input'],
					{ 
						[ styles['invalid'] ]: !isValid.title 
					}
				)}
				name="title"
				value={ values.title }
				onChange={ onChangeFormFields }
				placeholder="Enter title"
			/>

			<div className={ styles['form-row']}>
				<label htmlFor="date" className={ styles['form-label'] }>
					<img src='/calendar.svg' alt="Calendar icon" />
					<span>Data</span>
				</label>
			
				<input
					type="date"
					id='date'
					className={ cn( styles['input'],  { [ styles['invalid'] ]: !isValid.date }) }
					name="date"
					value={ values.date }
					onChange={ onChangeFormFields }
				/>
			
			</div>

			<div className={ styles['form-row']}>
				<label 
					htmlFor="tag" 
					className={ styles['form-label'] }>
					<img src='/folder.svg' alt="Folder icon" />
					<span>Tags</span>
				</label>

				<input type="text" 
					id="tag" 
					className={ cn(styles['input']) } 
					name="tag" 
					value={ values.tag }
					onChange={ onChangeFormFields }
					placeholder="Enter tag" />
			</div>
			

			<textarea
				name="post"
				cols="30"
				rows="10"
				className={ cn(
					styles.input, 
					{
						[ styles['invalid'] ]: !isValid.post
					}
				)}
				placeholder="Enter post"
				value={ values.post }
				onChange={ onChangeFormFields }
			></textarea>
			<Button text="Save" />
		</form>
	);
}

export default JournalForm;