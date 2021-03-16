import { useState, useEffect } from "react";
import fetch from 'cross-fetch';

const useFetch = (api) => {
    const [response, setResponse] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const myFetch = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(api);
                const data = await response.json();
                setResponse(data);
                setIsLoading(false);
            } catch (e) {
                setIsLoading(false);
            }
        };

        api ? myFetch() : setResponse({});

    }, [api]);

    return { response, isLoading };
};

export default useFetch;