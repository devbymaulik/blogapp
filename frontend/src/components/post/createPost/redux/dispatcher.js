import {
  createPostFailure,
  createPostRrequest,
  createPostSuccess,
  deletePost,
  deletePostComments,
  getPostDetailsFailure,
  getPostDetailsRequest,
  getPostDetailsSuccess,
  updatePostComments,
  updatePostLikes,
} from "./action";
import apiEndPoints from "../../../../utils/apiList";
import toast from "react-hot-toast";
import { serverCall } from "../../../../utils/serverCall";

export const createPost = (data) => {
  return async (dispatch) => {
    dispatch(createPostRrequest());
    try {
      let result = await serverCall(apiEndPoints.POST_CREATE, "POST", data);
      if (result.data) {
        toast.success("Post create successfully");
        dispatch(createPostSuccess(result.data));
      } else {
        toast.error(result.message);
        dispatch(createPostFailure(result.message));
      }
    } catch (error) {
      toast.error(error.message);
      dispatch(createPostFailure(error.message));
    }
  };
};
export const getPostDetails = (postId) => {
  return async (dispatch) => {
    dispatch(getPostDetailsRequest());

    try {
      const url = `${apiEndPoints.GET_POST_DETAILS}/${postId}`;
      let result = await serverCall(url, "GET", "");
      if (result.data) {
        dispatch(getPostDetailsSuccess(result.data));
      } else {
        toast.error(result.message);
        dispatch(getPostDetailsFailure(result.message));
      }
    } catch (error) {
      toast.error(error.message);
      dispatch(getPostDetailsFailure(error.message));
    }
  };
};
export const toggleLikeAction =
  (postId, userID) => async (dispatch, getState) => {
    try {
      const url = `${apiEndPoints.LIKE_ACTION}/${postId}`;
      const result = await serverCall(url, "PUT");
      if (result?.success === true) {
        if (result?.data) {
          const userAlreadyLiked =
            getState().getPostDetailsReducer.data.likes.includes(userID);
          dispatch(updatePostLikes(result?.data));
          toast.success(userAlreadyLiked ? "Post unliked" : "Post liked");
        }
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      toast.error(error.message || "Server error.");
    }
  };
export const addCommentAction = (postId, text) => async (dispatch) => {
  try {
    const url = `${apiEndPoints.COMMENT_ACTION}/${postId}`;
    const result = await serverCall(url, "POST", { text });
    if (result?.success === true) {
      if (result?.data) {
        dispatch(updatePostComments(result.data));
        toast.success("Comment added.");
      } else {
        toast.error("Comment failed.");
      }
    } else {
      toast.error("Something went wrong.");
    }
  } catch (error) {
    toast.error(error.message || "Server error.");
  }
};
export const deleteCommentAction = (postId, commentId) => async (dispatch) => {
  try {
    const url = `${apiEndPoints.DELETE_COMMENT}/${postId}/${commentId}`;
    const result = await serverCall(url, "DELETE");
    console.log(result);
    if (result.success === true) {
      dispatch(deletePostComments(result?.data));
      toast.success("Comment deleted successfully.");
    } else {
      toast.error(result.message || "Failed to delete comment");
    }
  } catch (error) {
    toast.error(error.message || "Server error.");
  }
};
export const deletePostAction = (postId) => async (dispatch) => {
  try {
    const url = `${apiEndPoints.DELETE_POST}/${postId}`;
    const result = await serverCall(url, "DELETE");
    if (result.success === true) {
      dispatch(deletePost());
      toast.success("Post deleted successfully.");
    } else {
      toast.error(result.message || "Failed to delete post");
    }
  } catch (error) {
    toast.error(error.message || "Server error.");
  }
};
