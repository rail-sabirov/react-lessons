import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useState } from 'react';

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
			setFormValidState(state => ({ ...state, title: styles.invalid })); 
			isFormValid = false;
        
		} else {
			setFormValidState(state => ({ ...state, title: '' }));
		}

		if (!formProps.date) {
			setFormValidState(state => ({ ...state, date: styles.invalid })); 
			isFormValid = false;
        
		} else {
			setFormValidState(state => ({ ...state, date: '' }));
		}

		if (!formProps.post?.trim().length) {
			setFormValidState(state => ({ ...state, post: styles.invalid })); 
			isFormValid = false;
        
		} else {
			setFormValidState(state => ({ ...state, post: '' }));
		}

		// Если форма не валидна не добавляем ничего
		if (!isFormValid) {
			return;
		}

		// Вызываем прокинутую функцию для добавления данных
		addItem(formProps);
	};

	console.log(styles['journal-form']);

	return (
		<>
			<form className={styles['journal-form']} onSubmit={addJournalItem}>
				<input
					type="text"
					className={`${styles.input} ${formValidState.title}`}
					name="title"
					placeholder="Enter title"
				/>

				<input
					type="date"
					className={`${styles['input']} ${formValidState.date}`}
					name="date"
				/>

				<input type="text" name="tag" placeholder="Enter tag" />

				<textarea
					name="post"
					cols="30"
					rows="10"
					className={`${styles.input} ${formValidState.post}`}
					placeholder="Enter post"
				></textarea>
				<Button text="Save" />
			</form>
		</>
	);
}

export default JournalForm;