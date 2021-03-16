import useFetch from './useFetch';

const useFTSAutoComplete = (searchTerm, maxResults = 6) => {
    const api = searchTerm && maxResults && `https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${maxResults}&solrTerm=${searchTerm}`;
    const { response: rawResponse, isLoading } = useFetch(api);
    return { response: rawResponse?.results?.docs || {}, isLoading };
};

export default useFTSAutoComplete;