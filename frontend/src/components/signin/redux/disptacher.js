import {
  errorLoginRequestData,
  initLoginRequestData,
  logoutUser,
  setLoginRequestData,
} from "./action";
import toast from "react-hot-toast";
import apiEndPoints from "../../../utils/apiList";
import { serverCall } from "../../../utils/serverCall";
export const loginUser = (data, navigate) => {
  return async (dispatch) => {
    dispatch(initLoginRequestData());

    try {
      let result = await serverCall(apiEndPoints.AUTH_LOGIN, "POST", data);
      if (result.success && result.data) {
        const token = result.data.token;
        localStorage.setItem("authToken", token);
        toast.success("User Signin successfully");
        dispatch(setLoginRequestData(result.data));
        navigate("/");
      } else {
        toast.error(result.message);
        dispatch(errorLoginRequestData(result.message));
      }
    } catch (error) {
      toast.error(error.message);
      dispatch(errorLoginRequestData(error.message));
    }
  };
};
export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("authToken");
    dispatch(logoutUser());
  };
};
