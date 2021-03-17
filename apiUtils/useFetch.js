import { useState, useEffect } from "react";
import fetch from 'cross-fetch';

const useFetch = (api) => {
    const [response, setResponse] = useState({});
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const myFetch = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(api);
                const data = await response.json();
                setResponse(data);
                setIsLoading(false);
                setError(false);
            } catch (e) {
                setIsLoading(false);
                setError(true);
            }
        };

        api ? myFetch() : setResponse({});

    }, [api]);

    return { response, isLoading, error };
};

export default useFetch;