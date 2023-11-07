import { memo } from 'react';
import styles from './Logo.module.css';

function Logo({ image }) {
    return <img className={styles.logo} src={ image } alt="Journal logo" />
}

export default memo(Logo);