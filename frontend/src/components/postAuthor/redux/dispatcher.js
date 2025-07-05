// Import required utilities and action types
import apiEndPoints from "../../../utils/apiList";
import { serverCall } from "../../../utils/serverCall";
import {
  fetchUserFailure,
  fetchUserRequest,
  fetchUserSuccess,
  updateProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
} from "./actons";
import toast from "react-hot-toast";
// ✅ Async Action to Fetch User by ID
export const getUserAction = (userId) => {
  return async (dispatch) => {
    dispatch(fetchUserRequest()); // Step 1: Start loading
    try {
      // Step 2: Build dynamic URL with userId
      const url = `${apiEndPoints.GET_USER}/${userId}`;
      // Step 3: Perform GET request
      const result = await serverCall(url, "GET", "");
      if (result.success === true) {
        dispatch(fetchUserSuccess(result.data));
      } else {
        toast.error(result?.message || "Unknown error occurred");
        dispatch(fetchUserFailure(result?.message || "Unknown error occurred"));
      }
    } catch (error) {
      toast.error(error.message || "Request failed");
      dispatch(fetchUserFailure(error.message || "Request failed"));
    }
  };
};
// ✅ Async Action to Update User
export const updateUser = (data) => {
  return async (dispatch) => {
    dispatch(updateProfileRequest()); // Step 1: Start loading
    try {
      // Step 3: Perform GET request
      const result = await serverCall(apiEndPoints.EDIT_USER, "PATCH", data);
      if (result.success === true) {
        dispatch(updateProfileSuccess(result.data));
        toast.success("User updated successfully");
      } else {
        toast.error(result?.message || "Unknown error occurred");
        dispatch(
          updateProfileFailure(result?.message || "Unknown error occurred")
        );
      }
    } catch (error) {
      toast.error(error.message || "Request failed");
      dispatch(updateProfileFailure(error.message || "Request failed"));
    }
  };
};
