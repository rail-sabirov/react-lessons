import { useContext, useMemo } from 'react';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import './JournalList.css';
import { UserContext } from '../../context/user.context';

// Сортировка элементов по дате, новые в начале
const sortItems = (a, b) => {
	if (a.date < b.date) {
		return 1;

	} else {
		return -1;
	}
};

function JournalList({ items }) {
	if (items.length === 0) {
		return <p>There are no posts yet, you can add a new one!</p>;
	}	

	// Получаем из контекста userId - для фильтрации вывода постов по пользователю
	const { userId } = useContext(UserContext);

	// Фильтрация и сортировка элементов с кешированием результата
	const filteredItems = useMemo(() => {
		return items
			.filter(el => el.userId === userId)
			.sort(sortItems);
	}, [items, userId]); 

	// Выводим список если есть записи
	return (
		<div className="journal-list">
			{ filteredItems
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

export default JournalList;