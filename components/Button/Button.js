import React from 'react';
import styles from './Button.module.css';

const Button = ({ className }) => {
    return <div className={`${styles.wrapper} ${className}`}></div>
}

export default Button;