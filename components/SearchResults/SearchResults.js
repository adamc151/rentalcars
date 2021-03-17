import React from 'react';
import styles from './SearchResults.module.css';

const placeTypes = {
    A: <div className={`${styles.placeType} ${styles.airport}`}>Airport</div>,
    C: <div className={`${styles.placeType} ${styles.city}`}>City</div>,
    T: <div className={`${styles.placeType} ${styles.station}`}>Station</div>,
    P: <div className={`${styles.placeType} ${styles.region}`}>Region</div>,
    D: <div className={`${styles.placeType} ${styles.district}`}>District</div>
}

export const getFormattedLocation = (location) => {

    const name = `${location.name}${location.iata ? ` (${location.iata})` : ''}`;
    const cityAndCountry = `${location.city ? `${location.city}, ` : ''}${location.country || ''}`;
    const longName = `${cityAndCountry ? `${name}, ${cityAndCountry}` : name}`;

    return {
        name,
        cityAndCountry,
        longName,
    }
};

const SearchResults = ({ results, selectedIndex, onClickItem, onMouseEnterItem }) => {

    if (!results?.length) return null;

    return <div className={styles.wrapper}>
        <ul
            className={styles.listWrapper}
            role="listbox"
            aria-activedescendant={`listItem${selectedIndex}`}
            tabIndex="0"
        >
            {results.map((location, i) => {

                const { name, cityAndCountry, longName } = getFormattedLocation(location);

                return <li
                    className={styles.lineItem}
                    key={i}
                    role="option"
                    id={`listItem${i}`}
                    aria-selected={i === selectedIndex}
                    onMouseEnter={() => onMouseEnterItem(i, location)}
                    onClick={() => onClickItem(i, longName)}
                >
                    {placeTypes[location.placeType]}
                    <div className={styles.placeDetails}>
                        <div className={styles.placeName}>{name}</div>
                        <div className={styles.placeLocation}>{cityAndCountry}</div>
                    </div>
                </li>
            })}
        </ul>
    </div >
}

export default SearchResults;