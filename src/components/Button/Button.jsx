import './Button.css';

function Button({ onClick, children }) {
	return (
		<button 
			className='button accent' 
			onClick={ onClick }>
				{ children }
		</button>
	);
}

export default Button;