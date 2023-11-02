import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

function SelectUser() {
    // Получаем контекст для выбранного пользователя
    const { userId, setUserId } = useContext(UserContext);

    //Функция для обработки выбора пользователя
    const changeUser = (event) => {
        // Присваиваем новое значение для userId в виде id номера
        setUserId(Number(event.target.value));
    };

    return (
        <select name="user" id="user" value={ userId } onChange={ changeUser }>
            <option value="1">John</option>
            <option value="2">Sam</option>
        </select>
    );
}

export default SelectUser;