import './Button.css';
import { useState } from 'react';

function Button() {
	// Хук для отслеживания состояния, первоначальное значение 'Save'
	const [buttonText, setButtonText] = useState('Save');

	// Отработка клика на кнопку, меняем название кнопки
	const clicked = () => {
		if (buttonText == 'Save') {
			setButtonText('Close');
			console.log('Button is was clicked! - Close');
		
		} else {
			setButtonText('Save');
			console.log('Button is was clicked! - Save');
		}
		
		
	};

	return (
		<button onClick={ clicked }  className='button accent'>{ buttonText }</button>
	);
}

export default Button;