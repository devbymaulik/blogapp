import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./signin/redux/disptacher";
import toast from "react-hot-toast";
function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("isLogin", "no");
    dispatch(logout());
    toast.success("User logged out successfully"); // ✅ toast only once
    navigate("/");
  }, [dispatch, navigate]);
  return null;
}
export default Logout;
