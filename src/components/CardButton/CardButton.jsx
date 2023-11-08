import './CardButton.css';

function CardButton({children, className, setItemFunc}) {
	const cl = 'card-button' + (className ? ' ' + className : '');
	return (
		<button className={cl} onClick={ setItemFunc }>
			{children}
		</button>
	);
}

export default CardButton;