import CardButton from '../CardButton/CardButton';
import './JournalAddButton.css';

const JournalAddButton = ({ onClick }) => {
	
	return (
		<CardButton className="journal-add-button" onClick={ onClick }>
			Новое воспоминание
		</CardButton>
	);
};

export default JournalAddButton;