const nock = require("nock");
import useFTSAutoComplete from "../useFTSAutoComplete";
import { renderHook } from "@testing-library/react-hooks";

describe("test", () => {

    test("should build request and fetch", async () => {

        //mock https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=mysearchterm
        nock("https://www.rentalcars.com")
            .get("/FTSAutocomplete.do")
            .query({
                solrIndex: 'fts_en',
                solrRows: '6',
                solrTerm: 'mysearchterm'
            }).reply(200, { hello: "world" });

        const { result, waitForNextUpdate } = renderHook(() =>
            useFTSAutoComplete(6, "mysearchterm")
        );

        expect(result.current.response).toEqual({});
        expect(result.current.isLoading).toEqual(true);

        await waitForNextUpdate();

        expect(result.current.response).toEqual({ hello: "world" });
        expect(result.current.isLoading).toEqual(false);
    });

    test("should not fetch api when maxResults not provided", async () => {

        const { result } = renderHook(() =>
            useFTSAutoComplete(null, "mysearchterm")
        );

        expect(result.current.response).toEqual({});
        expect(result.current.isLoading).toEqual(false);
    });

    test("should not fetch api when searchterm not provided", async () => {

        const { result } = renderHook(() =>
            useFTSAutoComplete(6, "")
        );

        expect(result.current.response).toEqual({});
        expect(result.current.isLoading).toEqual(false);
    });
});
