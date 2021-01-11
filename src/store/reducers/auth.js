import * as ActionTypes from "../actions/actionTypes";

const initState = {
  token: null,
  userID: null,
  error: null,
  loading: false,
  redirectPath: "/",
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case ActionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        userID: action.userID,
        error: null,
        loading: false,
      };
    case ActionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case ActionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userID: null,
      };
    case ActionTypes.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        redirectPath: action.path,
      };
    default:
      return state;
  }
};

export default reducer;
