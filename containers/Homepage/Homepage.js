import React, { useState } from 'react';
import styles from './Homepage.module.css';
import Header from '../../components/Header/Header';
import Searchbar from '../../components/Searchbar/Searchbar';
import useFTSAutoComplete from '../../hooks/useFTSAutoComplete';
import SearchResults from '../../components/SearchResults/SearchResults';

const Homepage = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const { response, isLoading } = useFTSAutoComplete(6, searchTerm);

    console.log('yooo response', response);

    return (<div className={styles.wrapper}>
        <Header></Header>
        <div className={styles.top}>
            <h1 className={styles.heading}>Car Hire – Search, Compare & Save</h1>
            <div className={styles.searchWrapper}>
                <h1>Where are you going?</h1>
                <p>Pick-up Location</p>
                <div className={styles.ctas}>
                    <Searchbar
                        onChange={(value) => setSearchTerm(value)}
                        debounceMs={500}
                        isLoading={isLoading}
                        placeholder="city, airport, station, region and district..."
                        ariaLabel="Pickup location"
                    />
                    <button className={styles.searchButton}>Search</button>
                </div>
                {response && <SearchResults results={response?.results?.docs} />}
            </div>
        </div>
    </div>);
}

export default Homepage;