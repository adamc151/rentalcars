import React from 'react';
import styles from './Homepage.module.css';
import Header from '../../components/Header/Header';
import PlacesSearch from '../PlacesSearch/PlacesSearch';

const Homepage = () => {
    return (<div className={styles.wrapper}>
        <Header></Header>
        <div className={styles.top}>
            <h1 className={styles.heading}>Car Hire – Search, Compare & Save</h1>
            <div className={styles.searchWrapper}>
                <h1>Where are you going?</h1>
                <p>Pick-up Location</p>
                <div className={styles.ctas}>
                    <PlacesSearch />
                    <button className={styles.searchButton}>Search</button>
                </div>

            </div>
        </div>
    </div>);
}

export default Homepage;