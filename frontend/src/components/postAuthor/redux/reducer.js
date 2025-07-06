// Import all user-related action constants
import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_AUTHOR_FAILURE,
  FETCH_AUTHOR_REQUEST,
  FETCH_AUTHOR_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from "./actons";
// 1.0 Get User Initial State
const getUserInitialState = {
  loading: false, // true when fetching user
  data: null, // fetched user data
  error: null, // error if fetching fails
};
// This reducer handles FETCH_USER_* actions and updates the state accordingly
export const getUseReducer = (state = getUserInitialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload, // Keyed by user ID
        error: null,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
// reducers/getAuthorReducer.js
const getAuthorInitialState = {
  loading: false,
  data: {}, // ✅ Fix: should be an object, not null
  error: null,
};
export const getAuthorReducer = (state = getAuthorInitialState, action) => {
  switch (action.type) {
    case FETCH_AUTHOR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_AUTHOR_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          [action.payload._id]: action.payload, // ✅ Keyed by user ID
        },
        error: null,
      };
    case FETCH_AUTHOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// 3.0 Update Profile Initial State
// This manages the update profile form state
const updateProfileInitialState = {
  loading: false, // true while update request is processing
  data: null, // updated user data after successful update
  error: null, // error if update fails
};
export const updateProfileReducer = (
  state = updateProfileInitialState,
  action
) => {
  switch (action.type) {
    // Triggered when profile update request is initiated
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true, // Show loading spinner
        error: null, // Reset previous error
        data: null, // Optionally clear previous data
      };

    // Triggered when profile update is successful
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false, // Stop loading
        data: action.payload, // Updated user profile data
        error: null, // Clear any error
      };

    // Triggered when profile update fails
    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false, // Stop loading
        error: action.payload, // Set the error message
        data: null, // Clear data if update failed
      };

    // Default: return current state
    default:
      return state;
  }
};
