const nock = require("nock");
import PlacesSearch from '../PlacesSearch';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import manchesterMock from '../__mocks__/manchester.json';

const setupMock = (solrRows, solrTerm, mock) => {
    nock("https://www.rentalcars.com")
        .get("/FTSAutocomplete.do")
        .query({
            solrIndex: 'fts_en',
            solrRows,
            solrTerm,
        }).reply(200, mock);
}

test('Displays results of search', async () => {

    setupMock(6, 'manchester', manchesterMock)

    render(<PlacesSearch />);
    const input = screen.getByLabelText('Pickup location')

    fireEvent.change(input, { target: { value: 'manchester' } })
    expect(input.value).toBe('manchester')
    await waitFor(() => expect(screen.queryAllByRole('option').length).toBe(6));
})

test('1 character', async () => {

    setupMock(6, 'm', manchesterMock);
    setupMock(6, 'ma', manchesterMock);

    render(<PlacesSearch />);
    const input = screen.getByLabelText('Pickup location')

    //Don't display results when 1 character is entered  
    fireEvent.change(input, { target: { value: 'm' } })
    expect(input.value).toBe('m')
    await waitFor(() => expect(screen.queryAllByRole('option').length).toBe(0));

    //Do display results when another character is entered  
    fireEvent.change(input, { target: { value: 'ma' } })
    expect(input.value).toBe('ma')
    await waitFor(() => expect(screen.queryAllByRole('option').length).toBe(6));

    //Don't display results when 2nd character is removed  
    fireEvent.change(input, { target: { value: 'm' } })
    expect(input.value).toBe('m')
    await waitFor(() => expect(screen.queryAllByRole('option').length).toBe(0));
})

