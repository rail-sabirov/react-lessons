import styles from './Header.module.css';

const Header = () => {
	return (
		<img className={styles.logo} src="/logo.svg" alt="Journal logo" />
	);
};

export default Header;