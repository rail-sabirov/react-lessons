import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import SelectUser from '../SelectUser/SelectUser';
import styles from './Header.module.css';
import { useState } from 'react';

const logos = ['./logo.svg', './vite.svg'];

const Header = () => {
	// Состояние для индекса логотипа
	const [logoIndex, setLogoIndex] = useState(0);
	const [secondIndex, setSecondIndex] = useState(0);
	
	const toggleLogo = () => {
		setLogoIndex(state => Number(!state));

		// Меняем другое состояние - оба изменения попадают в один пакет Batching
		setSecondIndex(index => index + 1);
	};

	console.log('--Header--');

	return (
		<>
			<Logo image={ logos[logoIndex] } />
			<SelectUser />
			<Button onClick={ toggleLogo }>Change logo</Button>
		</>
	);
};

export default Header;