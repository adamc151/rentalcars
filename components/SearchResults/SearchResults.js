import React from 'react';
import styles from './SearchResults.module.css';

const placeTypes = {
    A: <div className={`${styles.placeType} ${styles.airport}`}>Airport</div>,
    C: <div className={`${styles.placeType} ${styles.city}`}>City</div>,
    T: <div className={`${styles.placeType} ${styles.station}`}>Station</div>,
    P: <div className={`${styles.placeType} ${styles.region}`}>Region</div>,
    D: <div className={`${styles.placeType} ${styles.district}`}>District</div>
}

const SearchResults = ({ results }) => {
    return <div className={styles.wrapper}>
        <ul className={styles.listWrapper}>
            {results && results.map((place) => {
                return <li className={styles.lineItem}>
                    {placeTypes[place.placeType]}
                    <div className={styles.placeDetails}>
                        <div className={styles.placeName}>{place.name} {place.iata ? `(${place.iata})` : ''}</div>
                        <div className={styles.placeLocation}>{place.city ? `${place.city},` : ''} {place.country}</div>
                    </div>
                </li>
            })}
        </ul>
    </div >
}

export default SearchResults;