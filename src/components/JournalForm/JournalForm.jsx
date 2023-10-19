import './JournalForm.css';
import '../Button/Button';
import { useState } from 'react';
import Button from '../Button/Button';

function JournalForm() {
	// Состояние, для храненеия строки ввода в input
	const [inputData, setInputData] = useState();

	// Функция обработчик поля ввода
	const inputChange = (event) => {
		const val = event.target.value;
		const inputValue = (val + '').trim();

		console.log(inputValue);
		
		setInputData(inputValue);
	}    

    const addJournalItem = (event) => {
        event.preventDefault();

        // Объект для работы с формой в виде ключ-значение
        const formData = new FormData(event.target);

        // Получаем все значения из формы в виде объекта
        const formProps = Object.fromEntries(formData);

        console.log(formProps);
    };

    return (
        <form className='journal-form' onSubmit={addJournalItem}>
            <input type="text" name="title" placeholder='Enter title'/>
            <input type="date" name="date"/>
            <input type="text" name="tag" value={inputData} onChange={inputChange} placeholder='Enter tag'/>
            <textarea name="post" id="" cols="30" rows="10" placeholder='Enter post'></textarea>
            <Button 
                text="Save" 
                onClickHandlerFunction={
                    () => console.log('Button is pressed!')
                }
            />
        </form>
    );
}

export default JournalForm;