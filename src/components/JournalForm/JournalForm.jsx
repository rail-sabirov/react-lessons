import './JournalForm.css';
import Button from '../Button/Button';

function JournalForm({ addItem }) {
    const addJournalItem = (event) => {
        event.preventDefault();

        // Объект для работы с формой в виде ключ-значение
        const formData = new FormData(event.target);

        // Получаем все значения из формы в виде объекта
        const formProps = Object.fromEntries(formData);
        
        // Вызываем прокинутую функцию для добавления данных
        addItem(formProps);
    };

    return (
        <form className='journal-form' onSubmit={addJournalItem}>
            <input type="text" name="title" placeholder='Enter title'/>
            <input type="date" name="date"/>
            <input type="text" name="tag" placeholder='Enter tag'/>
            <textarea name="post" id="" cols="30" rows="10" placeholder='Enter post'></textarea>
            <Button text="Save" />
        </form>
    );
}

export default JournalForm;