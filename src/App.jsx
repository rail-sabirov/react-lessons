import './App.css';
import CardButton from './components/CardButton/CardButton';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalItem from './components/JournalItem/JournalItem';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';

function App() {
	const data = [
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

	// Функция обработчик поля ввода
	const inputChange = (event) => {
		console.log(event.target.value);
	}

	return (
		<div className="app">
			<LeftPanel>
				<Header />
				<JournalAddButton/>
				<JournalList>
					<CardButton>
						<JournalItem
							title={data[0].title}
							text={data[0].text}
							date={data[0].date}
						/>
					</CardButton>
					<CardButton>
						<JournalItem
							title={data[1].title}
							text={data[1].text}
							date={data[1].date}
						/>
					</CardButton>
				</JournalList>
			</LeftPanel>
			<Body>
				<input type='text' onChange={inputChange} />
			</Body>
		</div>
	);
}

export default App;
