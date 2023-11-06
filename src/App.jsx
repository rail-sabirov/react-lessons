import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import { useLocalStorage } from './hooks/useLocalStorage.hook';
import { UserContextProvider } from './context/user.context';


function App() {
	// Хук для чтения и изменения в localStorage
	const [items, saveItems] = useLocalStorage('data');

	// Корректировка даты
	function prepareDate(date) {
		const [dateYear, dateMonth, dateDay] = date.split('-').map(Number);

		return new Date(dateYear, dateMonth - 1, dateDay);
	}

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

console.log('--App--');

	// Функция для добавления новой записи в localStorage
	const addItem = (newItem) => {
		
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
	};

	return (
		<UserContextProvider>
			<div className="app">
				<LeftPanel>
					<Header />
					<JournalAddButton/>
					<JournalList items={ mapItems(items) }/>
				</LeftPanel>

				<Body>
					<JournalForm addItem={ addItem }/>
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;
