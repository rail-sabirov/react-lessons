import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import { useLocalStorage } from './hooks/useLocalStorage.hook';
import { UserContextProvider } from './context/user.context';
import { useState } from 'react';

// Корректировка даты
export function prepareDate(date) {
	if(date instanceof Date) {
		return date;
	} 

	const [dateYear, dateMonth, dateDay] = date.split('-').map(Number);

	return new Date(dateYear, dateMonth - 1, dateDay);
}


function App() {
	// Хук для чтения и изменения в localStorage
	const [items, saveItems] = useLocalStorage('data');

	// Для редактирования выбранного элемента
	const [selectedPostData, setSelectedPostData] = useState(null);

	
	// Перебор массива для нормализации даты
	function mapItems(items) {
		if (!items) {
			return [];
		}

		return items.map(i => ({
			...i,
			date: new Date(i.date)
		}));
	}

	// Функция для добавления новой записи в localStorage
	const addItem = (newItem) => {
		
		// Запись нового или изменение старого
		// -- Если запись не содержит id, значит она новая
		if (!newItem.id) {
			saveItems([
				...mapItems(items), 
				{
					...newItem,
					date: prepareDate(newItem.date),
					id: !!items && items.length > 0 
						? Math.max(...items.map(i => i.id)) + 1 
						: 1
				}
			]);
		
		} else {
			// Сохраняем изменения для исправленного поста
			saveItems([

				// Перебираем посты
				...mapItems(items).map(i => {

					// Если id поста как у нашего, возвращаем исправленные данные
					if (i.id === newItem.id) {
						return {
							...newItem,
							date: prepareDate(newItem.date)
						}
					} 

					// Если id не тот, тогда возвращаем оригинал
					return i;
				})
			]);
		}
		
	};

	// Удаление поста
	const deleteItem = (id) => {
		// Сохраняем посты в LocalStorage без поста с id
		saveItems([...items.filter(i => i.id !== id)])

		// Обнуляем выбранный пост, после удаления
		setSelectedPostData(null);
	};

	// Обнуляем выбранную статье, если она была ранее выбрана
	// далее сработает useEffect который слушает изменения setSelectedPostData -> JournalForm
	const createNewJournal = () => {
		setSelectedPostData(null);
	};

	return (
		<UserContextProvider>
			<div className="app">
				<LeftPanel>
					<Header />
					<JournalAddButton onClick={ createNewJournal } />
					<JournalList 
						items={ mapItems(items) } 
						setItemFunc={ setSelectedPostData }/>
				</LeftPanel>

				<Body>
					<JournalForm 
						addItem={ addItem }
						onDelete={ deleteItem }
						selectedPostData={ selectedPostData }/>
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;
