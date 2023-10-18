import './Button.css';

function Button({ text, onClickHandlerFunction }) {
	return (
		<button 
			className='button accent' 
			onClick={ onClickHandlerFunction }>
				{ text }
		</button>
	);
}

export default Button;