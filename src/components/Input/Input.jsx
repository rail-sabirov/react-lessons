import { forwardRef } from 'react';
import styles from './Input.module.css';
import cn from 'classnames';

const Input = forwardRef(function Input({ isValid, appearance, ...props }, ref) {
return (
        <input
            { ...props }
            ref={ ref }
            className={ cn(
                styles['input'],
                { 
                    [ styles['invalid'] ]: isValid === false,
                    [ styles['input-title'] ]: appearance === 'title' 
                }
            )}
        />
    );
});

export default Input;