import './Button.css';

function Button() {
	const clicked = () => {
		console.log('Button is was clicked!');
	};

	return (
		<button onClick={ clicked }  className='button accent'>Button</button>
	);
}

export default Button;