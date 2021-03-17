const nock = require("nock");
import useFTSAutoComplete from "../useFTSAutoComplete";
import { renderHook } from "@testing-library/react-hooks";


const setupMock = (solrRows, solrTerm, mock) => {
    nock("https://www.rentalcars.com")
        .get("/FTSAutocomplete.do")
        .query({
            solrIndex: 'fts_en',
            solrRows,
            solrTerm,
        }).reply(200, mock);
}

it("should build request and fetch", async () => {

    setupMock(5, 'mysearchterm', { results: { docs: ["hello world"] } });

    const { result, waitForNextUpdate } = renderHook(() =>
        useFTSAutoComplete("mysearchterm", 5)
    );

    expect(result.current.response).toEqual({});
    expect(result.current.isLoading).toEqual(true);

    await waitForNextUpdate();

    expect(result.current.response).toEqual(["hello world"]);
    expect(result.current.isLoading).toEqual(false);
});

it("solrRows query param should default to 6 when not provided", async () => {

    setupMock(6, 'mysearchterm', { results: { docs: ["hello world"] } });

    const { result, waitForNextUpdate } = renderHook(() =>
        useFTSAutoComplete("mysearchterm")
    );

    expect(result.current.response).toEqual({});
    expect(result.current.isLoading).toEqual(true);

    await waitForNextUpdate();

    expect(result.current.response).toEqual(["hello world"]);
    expect(result.current.isLoading).toEqual(false);
});

it("should not fetch api when searchterm not provided", async () => {

    const { result } = renderHook(() =>
        useFTSAutoComplete("", 6)
    );

    expect(result.current.response).toEqual({});
    expect(result.current.isLoading).toEqual(false);
});


it("should return error response when on api error", async () => {

    nock("https://www.rentalcars.com")
        .get("/FTSAutocomplete.do")
        .query({
            solrIndex: 'fts_en',
            solrRows: 6,
            solrTerm: 'hshadskdha',
        }).replyWithError('something awful happened')

    const { result, waitForNextUpdate } = renderHook(() =>
        useFTSAutoComplete("hshadskdha", 6)
    );

    expect(result.current.response).toEqual({});
    expect(result.current.isLoading).toEqual(true);

    await waitForNextUpdate();

    expect(result.current.response).toEqual([{ "name": "Something went wrong" }]);
    expect(result.current.isLoading).toEqual(false);

});


