import React, { useState, useRef } from 'react';
import debounce from 'lodash.debounce';
import styles from './Searchbar.module.css';

const Searchbar = ({ onChange = () => { }, debounceMs = 0, value: controlledValue = "" }) => {
    const [value, setValue] = useState(controlledValue);
    const debouncedOnChange = useRef(debounce(nextValue => onChange(nextValue), debounceMs)).current;

    return <input className={styles.wrapper} value={value} aria-label="input" onChange={(event) => {
        const { value } = event.target;
        setValue(value);
        debounceMs ? debouncedOnChange(value) : onChange(value);
    }} />
}

export default Searchbar;