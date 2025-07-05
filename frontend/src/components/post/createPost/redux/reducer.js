import {
  CREATE_POST_REQUREST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  GET_POST_DETAILS_REQUREST,
  GET_POST_DETAILS_SUCCESS,
  GET_POST_DETAILS_FAILURE,
  UPDATE_POST_LIKES,
  UPDATE_POST_COMMENTS,
  DELETE_POST_COMMENTS,
  DELETE_POST,
} from "./action";
const initialState = {
  post: null,
  loading: false,
  error: null,
};
const initialStateGetPost = {
  data: null,
  loading: false,
  error: null,
};
export const createPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST_REQUREST:
      return {
        ...state,
        isLoading: true,
        error: "",
      };

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        post: action.payload,
      };

    case CREATE_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        post: "",
      };

    default:
      return state;
  }
};
export const getPostDetailsReducer = (state = initialStateGetPost, action) => {
  switch (action.type) {
    case GET_POST_DETAILS_REQUREST:
      return {
        ...state,
        isLoading: true,
        error: "",
        data: null,
      };

    case GET_POST_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        data: action.payload,
      };

    case GET_POST_DETAILS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        data: "",
      };
    case UPDATE_POST_LIKES:
      return {
        ...state,
        data: {
          ...state.data,
          likes: action.payload, // Only update likes array
        },
      };
    case UPDATE_POST_COMMENTS:
      return {
        ...state,
        data: {
          ...state.data,
          comments: action.payload, // Only update likes array
        },
      };
    case DELETE_POST_COMMENTS:
      return {
        ...state,
        data: {
          ...state.data,
          comments: action.payload, // Only update likes array
        },
      };
    case DELETE_POST:
      return {
        ...state,
        data: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
