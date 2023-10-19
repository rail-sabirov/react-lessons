import { useState } from 'react';
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
	const INITIAL_DATA = [
		{
			title: 'Подготовка к обновлению курсов',
			text: 'Думал, что очень много времени...',
			date: new Date()
		},
		{
			title: 'Поход в горы',
			text: 'Горные походы открывают удивительные природные ландшафты',
			date: new Date()
		}
	];

	// Стейт для изменений в массиве
	const [items, setItems] = useState(INITIAL_DATA);

	// Функция для добавления новой записи в журнал
	const addItem = (item) => {
		// Добавляем новую запись в журнал используюя 
		// строковую функцию получаем старое значение
		setItems( (oldItem) => { 
			item.text = item.post;
			item.date = new Date(item.date);

			// возвращаем новый массив, чтобы изменилась ссылка и все обновилось
			return [...oldItem, item]; 
		} );
	}

	return (
		<div className="app">
			<LeftPanel>
				<Header />
				<JournalAddButton/>
				<JournalList>
					{/* [<Button text='Button 1'></Button>, <Button text='Button 2'></Button>] */}

					{ items.map((el, index) => (
						<CardButton key={ index }>
							<JournalItem
								title={el.title}
								text={el.text}
								date={el.date}
							/>
						</CardButton>
					)) }
					
					
				</JournalList>
			</LeftPanel>
			<Body>
				<JournalForm addItem={ addItem }/>
			</Body>
		</div>
	);
}

export default App;
