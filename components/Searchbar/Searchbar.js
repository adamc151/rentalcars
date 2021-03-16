import React, { useRef } from 'react';
import debounce from 'lodash.debounce';
import styles from './Searchbar.module.css';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Searchbar = ({ onChange = () => { }, debouncedOnChange = () => { }, debounceMs = 0, value, isLoading, placeholder, ariaLabel = 'input', ...rest }) => {
    const myDebouncedOnChange = useRef(debounce(nextValue => debouncedOnChange(nextValue), debounceMs)).current;

    return <div className={styles.wrapper}>
        <input
            className={styles.input}
            value={value}
            onChange={(event) => {
                const { value } = event.target;
                onChange(value)
                myDebouncedOnChange(value)
            }}
            aria-label={ariaLabel}
            {...rest}
        />
        {isLoading ? <div className={styles.loading}><LoadingSpinner /></div> : null}
    </div>
}

export default Searchbar;