import './JournalForm.css';
import Button from '../Button/Button';
import { useState } from 'react';

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
        <form className='journal-form' onSubmit={addJournalItem}>
            <input type="text" 
                name="title" 
                style={{border: formValidState.title ? undefined : '3px solid red'}}
                placeholder='Enter title'/>
            <input type="date" 
                style={{border: formValidState.date ? undefined : '3px solid red'}}
                name="date"/>
            <input type="text" 
                name="tag" 
                placeholder='Enter tag'/>
            <textarea name="post" 
                cols="30" 
                rows="10" 
                style={{border: formValidState.post ? undefined : '3px solid red'}}
                placeholder='Enter post'></textarea>
            <Button text="Save" />
        </form>
    );
}

export default JournalForm;