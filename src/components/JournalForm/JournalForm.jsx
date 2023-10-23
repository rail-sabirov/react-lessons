import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useState } from 'react';
import cn from 'classnames';

function JournalForm({ addItem }) {

	// Статус для валидации формы, с первоначальными параметрами
	const [formValidState, setFormValidState] = useState({
		title: true,
		post: true,
		date: true
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
						styles['input-title'], 
						{ 
							[ styles['invalid'] ]: !formValidState.title 
						}
					)}
					name="title"
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
						className={ cn( styles['input'],  { [ styles['invalid'] ]: !formValidState.date }) }
						name="date"
					/>
				
				</div>

				<div className={ styles['form-row']}>
					<label htmlFor="tag" className={ styles['form-label'] }>
						<img src='/folder.svg' alt="Folder icon" />
						<span>Tags</span>
					</label>

					<input type="text" id="tag" className={ cn(styles['input']) } name="tag" placeholder="Enter tag" />
				</div>
				

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