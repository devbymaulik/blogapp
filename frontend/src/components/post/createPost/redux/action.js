export const CREATE_POST_REQUREST = "CREATE_POST_REQUREST";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_FAILURE = "CREATE_POST_FAILURE";

export const GET_POST_DETAILS_REQUREST = "GET_POST_DETAILS_REQUREST";
export const GET_POST_DETAILS_SUCCESS = "GET_POST_DETAILS_SUCCESS";
export const GET_POST_DETAILS_FAILURE = "GET_POST_DETAILS_FAILURE";

export const UPDATE_POST_LIKES = "UPDATE_POST_LIKES";
export const UPDATE_POST_COMMENTS = "UPDATE_POST_COMMENTS";
export const DELETE_POST_COMMENTS = "DELETE_POST_COMMENTS";
export const DELETE_POST = "DELETE_POST";

export const createPostRrequest = () => {
  return { type: CREATE_POST_REQUREST };
};
export const createPostSuccess = (post) => {
  return { type: CREATE_POST_SUCCESS, payload: post };
};
export const createPostFailure = (error) => {
  return { type: CREATE_POST_FAILURE, payload: error };
};
export const getPostDetailsRequest = () => {
  return { type: GET_POST_DETAILS_REQUREST };
};
export const getPostDetailsSuccess = (post) => {
  return { type: GET_POST_DETAILS_SUCCESS, payload: post };
};
export const getPostDetailsFailure = (error) => {
  return { type: GET_POST_DETAILS_FAILURE, payload: error };
};
export const updatePostLikes = (likes) => {
  return { type: UPDATE_POST_LIKES, payload: likes };
};
export const updatePostComments = (comments) => {
  return { type: UPDATE_POST_COMMENTS, payload: comments };
};
export const deletePostComments = (comments) => {
  return { type: DELETE_POST_COMMENTS, payload: comments };
};
export const deletePost = () => {
  return { type: DELETE_POST };
};
