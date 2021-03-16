import useFetch from './useFetch';

const useFTSAutoComplete = (maxResults, searchTerm) => {
    const api = maxResults && searchTerm && `https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${maxResults}&solrTerm=${searchTerm}`;
    return useFetch(api);
};

export default useFTSAutoComplete;