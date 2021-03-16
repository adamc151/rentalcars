import React, { useState, useEffect, useRef } from 'react';
import styles from './PlacesSearch.module.css';
import Searchbar from '../../components/Searchbar/Searchbar';
import useFTSAutoComplete from '../../hooks/useFTSAutoComplete';
import SearchResults from '../../components/SearchResults/SearchResults';

const MAX_SEARCH_RESULTS = 6;

const PlacesSearch = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [selectedResult, setSelectedResult] = useState(0);
    const [resultsVisible, setResultsVisible] = useState(true);
    const { response: places, isLoading } = useFTSAutoComplete(MAX_SEARCH_RESULTS, searchTerm);
    const placesEl = useRef(null);

    const handleKeyPress = (event) => {
        switch (event.key) {
            case "ArrowDown":
                selectedResult < places?.length - 1 && setSelectedResult(selectedResult + 1);
                break;
            case "ArrowUp":
                selectedResult > 0 && setSelectedResult(selectedResult - 1);
                break;
            case "Enter":
                setInputValue(resultsVisible ? places[selectedResult].name : '');
                setResultsVisible(!resultsVisible);
                break;
            default:
                setInputValue('');
        }
    }

    const handleBodyClick = (e) => setResultsVisible(placesEl?.current?.contains?.(e.target));

    useEffect(() => {
        document.addEventListener("mousedown", handleBodyClick, false);
        document.addEventListener("touchstart", handleBodyClick, false);

        return (() => {
            document.removeEventListener("mousedown", handleBodyClick, false);
            document.removeEventListener("touchstart", handleBodyClick, false);
        });
    }, []);

    useEffect(() => {
        setSelectedResult(0);
        setResultsVisible(true);
    }, [places])

    return (
        <div className={styles.wrapper} ref={placesEl} onKeyDown={handleKeyPress} >
            <Searchbar
                onChange={(value) => setSearchTerm(value.length > 1 ? value : null)}
                debounceMs={200}
                isLoading={isLoading}
                placeholder="city, airport, station, region and district..."
                ariaLabel="Pickup location"
                value={inputValue}
            />
            {resultsVisible && <SearchResults
                results={places}
                selectedIndex={selectedResult}
                onMouseEnterItem={(index) => setSelectedResult(index)}
                onClickItem={(index, place) => {
                    setInputValue(place.name);
                    setResultsVisible(false);
                }}
            />}
        </div>

    );
}

export default PlacesSearch;