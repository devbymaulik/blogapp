import {
  ERROR_GET_POSTS_DATA,
  INIT_GET_POSTS_DATA,
  SET_GET_POSTS_DATA,
} from "./action";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_GET_POSTS_DATA:
      return {
        ...state,
        posts: [],
        isLoading: true,
        error: "",
      };

    case SET_GET_POSTS_DATA:
      return {
        ...state,
        isLoading: false,
        error: "",
        posts: action.payload,
      };

    case ERROR_GET_POSTS_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        posts: [],
      };

    default:
      return state;
  }
};

export default postsReducer;
