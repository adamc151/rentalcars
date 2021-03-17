import React, { useState, useEffect, useRef } from 'react';
import styles from './PlacesSearch.module.css';
import Searchbar from '../../components/Searchbar/Searchbar';
import useFTSAutoComplete from '../../apiUtils/useFTSAutoComplete';
import SearchResults from '../../components/SearchResults/SearchResults';

const PlacesSearch = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [selectedResult, setSelectedResult] = useState(0);
    const [resultsVisible, setResultsVisible] = useState(true);
    const { response: places, isLoading } = useFTSAutoComplete(searchTerm);
    const placesEl = useRef(null);

    // To navigate the list of results with up / down arrow keys
    // And select result on Enter
    const handleKeyPress = (event) => {
        if (!places?.length) return;
        switch (event.key) {
            case "ArrowDown":
                selectedResult < places?.length - 1 && setSelectedResult(selectedResult + 1);
                break;
            case "ArrowUp":
                selectedResult > 0 && setSelectedResult(selectedResult - 1);
                break;
            case "Enter":
                setInputValue(places[selectedResult].name);
                setResultsVisible(!resultsVisible);
                break;
        }
    }

    // To open / close the results dropdown on inside / outside click
    useEffect(() => {
        const handleBodyClick = (e) => setResultsVisible(placesEl?.current?.contains?.(e.target));
        document.addEventListener("mousedown", handleBodyClick, false);
        document.addEventListener("touchstart", handleBodyClick, false);

        return (() => {
            document.removeEventListener("mousedown", handleBodyClick, false);
            document.removeEventListener("touchstart", handleBodyClick, false);
        });
    }, []);

    // Select 1st result by default
    useEffect(() => {
        setSelectedResult(0);
        setResultsVisible(true);
    }, [places])

    return (
        <div data-testid="PlacesSearchWrapper" className={styles.wrapper} ref={placesEl} onKeyDown={handleKeyPress} >
            <Searchbar
                value={inputValue}
                onChange={(value) => setInputValue(value)}
                debouncedOnChange={(value) => setSearchTerm(value.length > 1 ? value : null)}
                debounceMs={300}
                isLoading={isLoading}
                placeholder="city, airport, station, region and district..."
                id="searchBar"
                aria-haspopup="listbox"
                ariaLabel={'Pick-up Location'}
                autoComplete="off"
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