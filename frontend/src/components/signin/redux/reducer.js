import {
  ERROR_LOGIN_REQUEST_DATA,
  INIT_LOGIN_REQUEST_DATA,
  LOGOUT_USER,
  SET_LOGIN_REQUEST_DATA,
} from "./action";

const initialState = {
  data: "",
  isLoading: false,
  error: "",
  isLogin: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_LOGIN_REQUEST_DATA:
      return {
        ...state,
        isLoading: true,
        error: "",
        isLogin: "",
      };

    case SET_LOGIN_REQUEST_DATA:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: "",
        isLogin: "yes",
      };

    case ERROR_LOGIN_REQUEST_DATA:
      return {
        ...state,
        data: {},
        isLoading: false,
        error: action.payload,
        isLogin: "",
      };

    case LOGOUT_USER:
      return {
        ...state,
        data: {},
        isLoading: false,
        error: "",
        isLogin: "",
      };

    default:
      return state;
  }
};

export default loginReducer;
