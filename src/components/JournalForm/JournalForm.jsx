import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useState } from 'react';
import cn from 'classnames';

function JournalForm({ addItem }) {

	// Статус для валидации формы, с первоначальными параметрами
	const [formValidState, setFormValidState] = useState({
		title: '',
		post: '',
		date: ''
	});

	const addJournalItem = (event) => {
		event.preventDefault();

		// Объект для работы с формой в виде ключ-значение
		const formData = new FormData(event.target);

		// Получаем все значения из формы в виде объекта
		const formProps = Object.fromEntries(formData);
        
		// Валидация полей формы
		let isFormValid = true;

		if (!formProps.title?.trim().length) {
			setFormValidState(state => ({ ...state, title: false })); 
			isFormValid = false;
        
		} else {
			setFormValidState(state => ({ ...state, title: true }));
		}

		if (!formProps.date) {
			setFormValidState(state => ({ ...state, date: false })); 
			isFormValid = false;
        
		} else {
			setFormValidState(state => ({ ...state, date: true }));
		}

		if (!formProps.post?.trim().length) {
			setFormValidState(state => ({ ...state, post: false })); 
			isFormValid = false;
        
		} else {
			setFormValidState(state => ({ ...state, post: true }));
		}

		// Если форма не валидна не добавляем ничего
		if (!isFormValid) {
			return;
		}

		// Вызываем прокинутую функцию для добавления данных
		addItem(formProps);
	};


	return (
		<>
			<form className={styles['journal-form']} onSubmit={addJournalItem}>
				<input
					type="text"
					className={ cn(
						styles.input, 
						{ 
							[ styles['invalid'] ]: !formValidState.title 
						}
					)}
					name="title"
					placeholder="Enter title"
				/>

				<input
					type="date"
					className={ cn(
						styles['input'],  
						{
							[ styles['invalid'] ]: !formValidState.date
						}
					)}
					name="date"
				/>

				<input type="text" name="tag" placeholder="Enter tag" />

				<textarea
					name="post"
					cols="30"
					rows="10"
					className={ cn(
						styles.input, 
						{
							[ styles['invalid'] ]: !formValidState.post
						}
					)}
					placeholder="Enter post"
				></textarea>
				<Button text="Save" />
			</form>
		</>
	);
}

export default JournalForm;

cn(styles['input'], styles.invalid);