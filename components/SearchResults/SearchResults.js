import React from 'react';
import styles from './SearchResults.module.css';

const placeTypes = {
    A: <div className={`${styles.placeType} ${styles.airport}`}>Airport</div>,
    C: <div className={`${styles.placeType} ${styles.city}`}>City</div>,
    T: <div className={`${styles.placeType} ${styles.station}`}>Station</div>,
    P: <div className={`${styles.placeType} ${styles.region}`}>Region</div>,
    D: <div className={`${styles.placeType} ${styles.district}`}>District</div>
}

const SearchResults = ({ results, selectedIndex, onClickItem, onMouseEnterItem }) => {

    if (!results?.length) return null;

    return <div className={styles.wrapper}>
        <ul
            className={styles.listWrapper}
            role="listbox"
            aria-activedescendant={`listItem${selectedIndex}`}
            tabIndex="0"
        >
            {results.map((place, i) => {
                return <li
                    className={styles.lineItem}
                    key={i}
                    role="option"
                    id={`listItem${i}`}
                    aria-selected={i === selectedIndex}
                    onMouseEnter={() => onMouseEnterItem(i, place)}
                    onClick={() => onClickItem(i, place)}
                >
                    {placeTypes[place.placeType]}
                    <div className={styles.placeDetails}>
                        <div className={styles.placeName}>{place.name}{place.iata ? ` (${place.iata})` : ''}</div>
                        <div className={styles.placeLocation}>{place.city ? `${place.city}, ` : ''}{place.country}</div>
                    </div>
                </li>
            })}
        </ul>
    </div >
}

export default SearchResults;