import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction, updateUser } from "./redux/dispatcher";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/";

export default function UpdateProfile() {
  const dispatch = useDispatch();

  // Get logged-in user ID from loginReducer
  const userID = useSelector((state) => state.loginReducer.data?.id);
  // Get fetched user data
  const { data: user } = useSelector((state) => state.getUseReducer || {});
  const {
    data: updatedUser,
    loading,
    error,
  } = useSelector((state) => state.updateUser || {});

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    avatar: null,
    preview: "",
  });

  // Fetch user on mount or when userID changes
  useEffect(() => {
    if (userID) {
      dispatch(getUserAction(userID));
    }
  }, [userID, dispatch]);

  // Populate form when user data is fetched
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        currentPassword: "",
        newPassword: "",
        avatar: null,
        preview: user.avatar ? `${BACKEND_URL}uploads/${user.avatar}` : "", // Update base URL if different
      });
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        avatar: file,
        preview: file ? URL.createObjectURL(file) : prev.preview,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append("name", formData.name);
    updatedData.append("email", formData.email);
    updatedData.append("currentPassword", formData.currentPassword);
    updatedData.append("newPassword", formData.newPassword);
    if (formData.avatar) {
      updatedData.append("avatar", formData.avatar);
    }
    dispatch(updateUser(updatedData));
  };

  return (
    <div className="container my-4">
      <h3>Update Profile</h3>

      {error && <div className="alert alert-danger">{error}</div>}
      {updatedUser && (
        <div className="alert alert-success">Profile updated!</div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Current Password</label>
          <input
            type="password"
            className="form-control"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Avatar</label>
          <input
            type="file"
            className="form-control"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
          />
          {formData.preview && (
            <div className="mt-2">
              <img
                src={formData.preview}
                alt="Avatar Preview"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid #ccc",
                }}
              />
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
