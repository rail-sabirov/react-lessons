import { useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button/Button';
import CardButton from './components/CardButton/CardButton';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalItem from './components/JournalItem/JournalItem';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';


function App() {
	// Стейт для изменений в массиве
	const [items, setItems] = useState([]);

	// Получаем данные из LocalStorage в виде JSON один раз при инициализации компонента
	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('data'));

		if(data) {
			setItems(data.map( item => ({
				...item,
				date: new Date(item.date)
			}))
			);
		}
	}, []);

	// сайд эффект с подпиской (когда меняется item), сохраняем данные в LocalStorage
	useEffect(() => {
		if(items.length) {
			localStorage.setItem('data', JSON.stringify(items));
			console.log('data is saved to localStorage!')
		}
	}, [items]);


	// Функция для добавления новой записи в журнал
	const addItem = (item) => {
		// Добавляем новую запись в журнал используюя 
		// строковую функцию получаем старое значение
		setItems( (oldItem) => { 
			const maxId = oldItem.length > 0 ? Math.max(...oldItem.map(i => i.id)) : 0;
			item.text = item.post;
			item.date = new Date(item.date);
			item.id =  maxId + 1;

			// возвращаем новый массив, чтобы изменилась ссылка и все обновилось
			return [...oldItem, item]; 
		} );
	}

	return (
		<div className="app">
			<LeftPanel>
				<Header />
				<JournalAddButton/>
				<JournalList items={ items }/>
			</LeftPanel>

			<Body>
				<JournalForm addItem={ addItem }/>
			</Body>
		</div>
	);
}

export default App;
