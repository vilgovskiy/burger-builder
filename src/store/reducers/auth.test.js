import reducer from "./auth";
import * as ActionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  it("Should return init state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userID: null,
      error: null,
      loading: false,
      redirectPath: "/",
    });
  });

  it("Should store token upon login", () => {
    expect(
      reducer(
        {
          token: null,
          userID: null,
          error: null,
          loading: false,
          redirectPath: "/",
        },
        {
          type: ActionTypes.AUTH_SUCCESS,
          token: "some-token",
          userID: "some-user-id",
        }
      )
    ).toEqual(        {
        token: "some-token",
        userID: "some-user-id",
        error: null,
        loading: false,
        redirectPath: "/",
      });
  });
});
