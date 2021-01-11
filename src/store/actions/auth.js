import Axios from "axios";
import * as ActionTypes from "./actionTypes";
import {API_KEY} from '../../secure/private'

export const authStart = () => {
  return {
    type: ActionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userID) => {
  return {
    type: ActionTypes.AUTH_SUCCESS,
    token: token,
    userID: userID,
  };
};

export const authFail = (error) => {
  return {
    type: ActionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userID");
  return {
    type: ActionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expiresIn) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expiresIn * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    }
    Axios.post(url + API_KEY, authData)
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userID", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const setAuthRedirect = (path) => {
  return {
    type: ActionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authChekState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        const userID = localStorage.getItem("userID");
        dispatch(authSuccess(token, userID));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
