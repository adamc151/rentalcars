import React from 'react';
import styles from './Header.module.css';

const Header = () => <div className={styles.wrapper}>
    <a className={styles.logo} href="https://www.rentalcars.com/" alt={"RentalCars.com"} ></a>
</div>;

export default Header;