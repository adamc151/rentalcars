import React, { useState, useRef, useEffect } from 'react';
import debounce from 'lodash.debounce';
import styles from './Searchbar.module.css';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Searchbar = ({ onChange = () => { }, debounceMs = 0, value: controlledValue = "", isLoading, placeholder, ariaLabel = 'input' }) => {
    const [value, setValue] = useState(controlledValue);
    const debouncedOnChange = useRef(debounce(nextValue => onChange(nextValue), debounceMs)).current;

    useEffect(() => {
        controlledValue && setValue(controlledValue);
    }, [controlledValue])

    return <div className={styles.wrapper}>
        <input
            className={styles.input}
            value={value}
            onChange={(event) => {
                const { value } = event.target;
                setValue(value);
                debounceMs ? debouncedOnChange(value) : onChange(value);
            }}
            placeholder={placeholder || ''}
            aria-label={ariaLabel}
            aria-haspopup="listbox"
            id="searchbar"
            autoComplete="off"
        />
        {isLoading ? <div className={styles.loading}><LoadingSpinner /></div> : null}
    </div>
}

export default Searchbar;