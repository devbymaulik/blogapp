// components/postAuthor/redux/actions.js
export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

// components/postAuthor/redux/actions.js
export const FETCH_AUTHOR_REQUEST = "FETCH_AUTHOR_REQUEST";
export const FETCH_AUTHOR_SUCCESS = "FETCH_AUTHOR_SUCCESS";
export const FETCH_AUTHOR_FAILURE = "FETCH_AUTHOR_FAILURE";

export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE";

// Fetch User Actions
export function fetchUserRequest() {
  return {
    type: FETCH_USER_REQUEST,
  };
}
export function fetchUserSuccess(data) {
  return {
    type: FETCH_USER_SUCCESS,
    payload: data,
  };
}
export function fetchUserFailure(error) {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
}

export function fetchAuthorRequest() {
  return {
    type: FETCH_AUTHOR_REQUEST,
  };
}
export function fetchAuthorSuccess(data) {
  return {
    type: FETCH_AUTHOR_SUCCESS,
    payload: data,
  };
}
export function fetchAuthorFailure(error) {
  return {
    type: FETCH_AUTHOR_FAILURE,
    payload: error,
  };
}

// Update Profile Actions
export function updateProfileRequest() {
  return {
    type: UPDATE_PROFILE_REQUEST,
  };
}
export function updateProfileSuccess(data) {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    payload: data,
  };
}
export function updateProfileFailure(error) {
  return {
    type: UPDATE_PROFILE_FAILURE,
    payload: error,
  };
}
