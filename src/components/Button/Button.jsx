import './Button.css';
import cn from 'classnames';

function Button({ type='button', onClick, children, className }) {
	return (
		<button 
			type={type}
			className={cn('button accent', className)} 
			onClick={ onClick }>
				{ children }
		</button>
	);
}

export default Button;