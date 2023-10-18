import './Button.css';
import { useState } from 'react';

function Button({ text }) {
	return (
		<button className='button accent'>{ text }</button>
	);
}

export default Button;