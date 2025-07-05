export const INIT_LOGIN_REQUEST_DATA = "INIT_LOGIN_REQUEST_DATA";
export const SET_LOGIN_REQUEST_DATA = "SET_LOGIN_REQUEST_DATA";
export const ERROR_LOGIN_REQUEST_DATA = "ERROR_LOGIN_REQUEST_DATA";
export const LOGOUT_USER = "LOGOUT_USER";

//action creator
export function initLoginRequestData() {
  return { type: INIT_LOGIN_REQUEST_DATA };
}

export function setLoginRequestData(data) {
  return { type: SET_LOGIN_REQUEST_DATA, payload: data };
}

export function errorLoginRequestData(err) {
  return { type: ERROR_LOGIN_REQUEST_DATA, payload: err };
}

export function logoutUser() {
  return { type: LOGOUT_USER };
}
