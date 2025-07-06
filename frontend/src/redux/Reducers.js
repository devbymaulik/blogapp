import { combineReducers } from "redux";
import registerReducer from "../components/signup/redux/reducer";
import loginReducer from "../components/signin/redux/reducer";
import {
  getAuthorReducer,
  getUseReducer,
  updateProfileReducer,
} from "../components/postAuthor/redux/reducer";
import {
  createPostReducer,
  getPostDetailsReducer,
} from "../components/post/createPost/redux/reducer";
import postsReducer from "../components/home/redux/reducer";
const appReducer = combineReducers({
  registerReducer: registerReducer,
  loginReducer: loginReducer,
  getUseReducer: getUseReducer,
  updateProfileReducer: updateProfileReducer,
  getPostDetailsReducer: getPostDetailsReducer,
  createPostReducer: createPostReducer,
  postsReducer: postsReducer,
  authors: getAuthorReducer,
});
const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
