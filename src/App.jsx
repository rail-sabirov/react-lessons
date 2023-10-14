import './App.css';
import Button from './components/Button/Button';
import CardButton from './components/CardButton/CardButton';
import JournalItem from './components/JournalItem/JournalItem';

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
  
	return (
		<>
			<h1>TITLE</h1>
			<p>Some text</p>
			<Button />
			<CardButton>Create new Event</CardButton>
			<CardButton>
				<JournalItem 
					title={ data[0].title }
					text={ data[0].text }
					date={ data[0].date }
				/>
			</CardButton>
			<CardButton>
				<JournalItem 
					title={ data[1].title }
					text={ data[1].text }
					date={ data[1].date }
				/>
			</CardButton>
		</>
	);
}

export default App;
