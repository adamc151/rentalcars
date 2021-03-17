const nock = require("nock");
import useFetch from "../useFetch";
import { renderHook } from "@testing-library/react-hooks";


it("should fetch api", async () => {

    nock("https://example").get("/api").reply(200, { hello: "world" });

    const { result, waitForNextUpdate } = renderHook(() =>
        useFetch("https://example/api")
    );

    expect(result.current.response).toEqual({});
    expect(result.current.isLoading).toEqual(true);
    expect(result.current.error).toEqual(false);

    await waitForNextUpdate();

    expect(result.current.response).toEqual({ hello: "world" });
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.error).toEqual(false);

});

it("should handle api error", async () => {

    nock("https://example").get("/api").replyWithError("Error");

    const { result, waitForNextUpdate } = renderHook(() =>
        useFetch("https://example/api")
    );

    expect(result.current.response).toEqual({});
    expect(result.current.isLoading).toEqual(true);
    expect(result.current.error).toEqual(false);


    await waitForNextUpdate();

    expect(result.current.response).toEqual({});
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.error).toEqual(true);
});

it("should not fetch api when api not provided", async () => {

    const { result } = renderHook(() =>
        useFetch("")
    );

    expect(result.current.response).toEqual({});
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.error).toEqual(false);
});

