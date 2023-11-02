import { useContext } from 'react';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import './JournalList.css';
import { UserContext } from '../../context/user.context';

function JournalList({ items }) {
	// Получаем из контекста userId - для фильтрации вывода постов по пользователю
	const { userId } = useContext(UserContext);


	// Сортировка элементов по дате, новые в начале
	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;

		} else {
			return -1;
		}
	};

	// Выводим список если есть записи
	if (items.length > 0) {
		
		return (
			<div className="journal-list">
				{ items
					.filter(el => el.userId === userId)
					.sort(sortItems)
					.map(el => (
						<CardButton key={ el.id }>
							<JournalItem
								title={el.title}	
								text={el.post}
								date={el.date}
							/>
						</CardButton>
					)) 
				}
			</div>
		);
	}

	// ИЛИ Выводим сообщение
	return <p>There are no posts yet, you can add a new one!</p>;
	
}

export default JournalList;