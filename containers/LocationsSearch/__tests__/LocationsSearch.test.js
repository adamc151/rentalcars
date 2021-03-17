const nock = require("nock");
import LocationsSearch from '../LocationsSearch';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'
import manchesterMock from '../__mocks__/manchester.json';
import noResults from '../__mocks__/noResults.json';

/*****  Utils *****/
const setupMock = (solrRows, solrTerm, mock) => {
    nock("https://www.rentalcars.com")
        .get("/FTSAutocomplete.do")
        .query({
            solrIndex: 'fts_en',
            solrRows,
            solrTerm,
        }).reply(200, mock);
}

//returns search input element
const getSearchInput = () => screen.getByLabelText('Pick-up Location');

//Sets and asserts the search input value
const setSearchValue = (value) => {
    fireEvent.change(getSearchInput(), { target: { value } })
    expect(getSearchInput().value).toBe(value)
}

//returns array of result elements
const getResults = () => screen.queryAllByRole('option');

//returns the currently selectedsearch result
const getSelectedResult = () => screen.getByRole('option', { selected: true });



/*****  Tests *****/
// Set up manchester mock before each
beforeEach(() => {
    setupMock(6, 'manchester', manchesterMock)
})


it('should have correct placeholder text for searchbar', async () => {
    render(<LocationsSearch />);
    expect(getSearchInput().placeholder).toBe('city, airport, station, region and district...');
})


it('Should display results of search', async () => {
    render(<LocationsSearch />);
    setSearchValue('manchester');
    await waitFor(() => expect(getResults().length).toBe(6));
})


it('Should display results not found', async () => {

    setupMock(6, 'xhdshjfeucdi', noResults);
    render(<LocationsSearch />);

    setSearchValue('xhdshjfeucdi');
    await waitFor(() => expect(getResults().length).toBe(1));
    expect(getResults()[0].textContent).toBe("No results found")
})

it('Should display something went wrong', async () => {

    nock("https://www.rentalcars.com")
        .get("/FTSAutocomplete.do")
        .query({
            solrIndex: 'fts_en',
            solrRows: 6,
            solrTerm: 'aaaaa',
        }).replyWithError("Error");

    render(<LocationsSearch />);

    setSearchValue('aaaaa');
    await waitFor(() => expect(getResults().length).toBe(1));
    expect(getResults()[0].textContent).toBe("Something went wrong")
})


it('Should meet single character requirements', async () => {

    setupMock(6, 'm', manchesterMock);
    setupMock(6, 'ma', manchesterMock);
    render(<LocationsSearch />);

    //Don't display results when 1 character is entered  
    setSearchValue('m');
    await waitFor(() => expect(getResults().length).toBe(0));

    //Do display results when another character is entered  
    setSearchValue('ma');
    await waitFor(() => expect(getResults().length).toBe(6));

    //Don't display results when 2nd character is removed  
    setSearchValue('m');
    await waitFor(() => expect(getResults().length).toBe(0));
})


it('should set search input value equal to result that is clicked', async () => {

    render(<LocationsSearch />);
    setSearchValue('manchester');

    await waitFor(() => expect(getResults().length).toBe(6));

    fireEvent.mouseEnter(getResults()[1]);
    expect(getSelectedResult().textContent).toBe("CityManchesterUnited Kingdom")

    fireEvent.click(getSelectedResult());

    await waitFor(() => expect(getResults().length).toBe(0));
    expect(getSearchInput().value).toBe('Manchester, United Kingdom')
})


it('should hide results on outside click, and show results again on inside click', async () => {

    // mock global addEventListener
    const map = {};
    document.addEventListener = jest.fn((event, cb) => map[event] = cb);

    render(<div data-testid="outsideLocationsSearch"><LocationsSearch /></div>);

    setSearchValue('manchester');
    await waitFor(() => expect(getResults().length).toBe(6));

    act(() => map.mousedown({ target: screen.getByTestId('outsideLocationsSearch') }));

    await waitFor(() => expect(getResults().length).toBe(0));
})


describe('Accessibility keyboard events', () => {

    it('should initially set first result as selected', async () => {

        render(<LocationsSearch />);
        setSearchValue('manchester');
        await waitFor(() => expect(getSelectedResult().textContent).toBe("AirportManchester Airport (MAN)Manchester, United Kingdom"));
    })


    it('should set search input value to selected result when Enter key pressed', async () => {

        render(<LocationsSearch />);
        setSearchValue('manchester');

        await waitFor(() => expect(getSelectedResult().textContent).toBe("AirportManchester Airport (MAN)Manchester, United Kingdom"));

        fireEvent.keyDown(screen.getByTestId('LocationsSearchWrapper'), { key: 'Enter' })
        await waitFor(() => expect(getResults().length).toBe(0));
        expect(getSearchInput().value).toBe('Manchester Airport (MAN), Manchester, United Kingdom')
    })


    it('should change selected result with ArrowUp key and ArrowDown key', async () => {

        render(<LocationsSearch />);
        setSearchValue('manchester');

        await waitFor(() => expect(getSelectedResult().textContent).toBe("AirportManchester Airport (MAN)Manchester, United Kingdom"));

        fireEvent.keyDown(getSearchInput(), { key: 'ArrowUp' })
        expect(getSelectedResult().textContent).toBe("AirportManchester Airport (MAN)Manchester, United Kingdom")

        fireEvent.keyDown(getSearchInput(), { key: 'ArrowDown' })
        expect(getSelectedResult().textContent).toBe("CityManchesterUnited Kingdom");

        fireEvent.keyDown(getSearchInput(), { key: 'ArrowUp' })
        expect(getSelectedResult().textContent).toBe("AirportManchester Airport (MAN)Manchester, United Kingdom");
    })


    it('should do nothing when no results and Enter key pressed', async () => {

        render(<LocationsSearch />);
        fireEvent.keyDown(screen.getByTestId('LocationsSearchWrapper'), { key: 'Enter' })
        expect(getSearchInput().value).toBe('')
    })
})





