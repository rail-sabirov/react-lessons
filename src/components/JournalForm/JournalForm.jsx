import './JournalForm.css';
import Button from '../Button/Button';
import { useState } from 'react';

function JournalForm({ addItem }) {

    // Статус для валидации формы, с первоначальными параметрами
    const [formValidState, setFormValidState] = useState({
        title: undefined,
        post: undefined,
        date: undefined
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
            setFormValidState(state => ({ ...state, title: 'invalid' })); 
            isFormValid = false;
        
        } else {
            setFormValidState(state => ({ ...state, title: undefined }));
        }

        if (!formProps.date) {
            setFormValidState(state => ({ ...state, date: 'invalid' })); 
            isFormValid = false;
        
        } else {
            setFormValidState(state => ({ ...state, date: undefined }));
        }

        if (!formProps.post?.trim().length) {
            setFormValidState(state => ({ ...state, post: 'invalid' })); 
            isFormValid = false;
        
        } else {
            setFormValidState(state => ({ ...state, post: undefined }));
        }

        // Если форма не валидна не добавляем ничего
        if (!isFormValid) {
            return;
        }

        // Вызываем прокинутую функцию для добавления данных
        addItem(formProps);
    };

    return (
        <form className='journal-form' onSubmit={addJournalItem}>
            <input type="text" 
                className={`input ${ formValidState.title }`}
                name="title" 
                placeholder='Enter title'/>

            <input type="date" 
                className={`input ${ formValidState.date }`}
                name="date"/>
                
            <input type="text" 
                name="tag" 
                placeholder='Enter tag'/>

            <textarea name="post" 
                cols="30" 
                rows="10" 
                className={`input ${ formValidState.post }`}
                placeholder='Enter post'></textarea>
            <Button text="Save" />
        </form>
    );
}

export default JournalForm;