import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import './JournalList.css';

function JournalList({ items }) {
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
				{ items.sort(sortItems).map(el => (
					<CardButton key={ el.id }>
						<JournalItem
							title={el.title}	
							text={el.text}
							date={el.date}
						/>
					</CardButton>
				)) }
			</div>
		);
	}

	// ИЛИ Выводим сообщение
	return <p>There are no posts yet, you can add a new one!</p>;
	
}

export default JournalList;