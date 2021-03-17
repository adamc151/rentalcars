import React, { useState, useEffect, useRef } from 'react';
import styles from './LocationsSearch.module.css';
import Searchbar from '../../components/Searchbar/Searchbar';
import useFTSAutoComplete from '../../apiUtils/useFTSAutoComplete';
import SearchResults, { getFormattedLocation } from '../../components/SearchResults/SearchResults';

const LocationsSearch = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [selectedResult, setSelectedResult] = useState(0);
    const [resultsVisible, setResultsVisible] = useState(true);
    const { response: locations, isLoading } = useFTSAutoComplete(searchTerm);
    const locationsEl = useRef(null);

    // To navigate the list of results with up / down arrow keys
    // And select result on Enter
    const handleKeyPress = (event) => {
        if (!locations?.length) return;
        switch (event.key) {
            case "ArrowDown":
                selectedResult < locations?.length - 1 && setSelectedResult(selectedResult + 1);
                break;
            case "ArrowUp":
                selectedResult > 0 && setSelectedResult(selectedResult - 1);
                break;
            case "Enter":
                setInputValue(getFormattedLocation(locations[selectedResult]).longName);
                setResultsVisible(!resultsVisible);
                break;
        }
    }

    // To open / close the results dropdown on inside / outside click
    useEffect(() => {
        const handleBodyClick = (e) => setResultsVisible(locationsEl?.current?.contains?.(e.target));
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
    }, [locations])

    return (
        <div data-testid="LocationsSearchWrapper" className={styles.wrapper} ref={locationsEl} onKeyDown={handleKeyPress} >
            <Searchbar
                value={inputValue}
                onChange={(value) => setInputValue(value)}
                debouncedOnChange={(value) => setSearchTerm(value.length > 1 ? value : null)}
                debounceMs={300}
                isLoading={isLoading}
                placeholder="city, airport, station, region and district..."
                id="searchBar"
                aria-haspopup={"true"}
                ariaLabel={'Pick-up Location'}
                autoComplete="off"
            />
            {resultsVisible && <SearchResults
                results={locations}
                selectedIndex={selectedResult}
                onMouseEnterItem={(index) => setSelectedResult(index)}
                onClickItem={(index, name) => {
                    setInputValue(name);
                    setResultsVisible(false);
                }}
            />}
        </div>
    );
}

export default LocationsSearch;