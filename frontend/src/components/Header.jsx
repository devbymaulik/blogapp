import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  const loginData = useSelector((state) => state.loginReducer); // Adjust this to your reducer
  const isLogin = loginData.isLogin;
  const userData = loginData.data;
  return (
    <header className="container-fluid shadow bg-white sticky-top">
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <Link className="navbar-brand" to="/">
            <img
              className="image-fluid"
              src="../../logo.png"
              alt="Blog Logo"
              style={{ height: "65px", width: "auto" }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav align-items-center">
              <li className="nav-item mx-2">
                <Link
                  className={`nav-link nav-animated fw-medium ${
                    currentPath === "/" ? "active text-primary" : "text-dark"
                  }`}
                  to="/"
                >
                  Home
                </Link>
              </li>
              {isLogin && (
                <li className="nav-item mx-2">
                  <Link
                    className={`nav-link nav-animated fw-medium ${
                      currentPath === "/post/create"
                        ? "active text-primary"
                        : "text-dark"
                    }`}
                    to="/post/create"
                  >
                    Create Post
                  </Link>
                </li>
              )}
              {!isLogin && (
                <>
                  <li className="nav-item mx-2">
                    <Link
                      className={`nav-link nav-animated fw-medium ${
                        currentPath === "/signup"
                          ? "active text-primary"
                          : "text-dark"
                      }`}
                      to="/signup"
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li className="nav-item mx-2">
                    <Link
                      className={`nav-link nav-animated fw-medium ${
                        currentPath === "/signin"
                          ? "active text-primary"
                          : "text-dark"
                      }`}
                      to="/signin"
                    >
                      Sign In
                    </Link>
                  </li>
                </>
              )}

              {/* User Profile Dropdown */}
              {isLogin && (
                <li className="nav-item dropdown mx-2">
                  <span
                    className="nav-link dropdown-toggle d-flex align-items-center text-dark fw-medium"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUserCircle size={20} className="me-1" />
                    {userData?.name || "User"}
                  </span>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        Update Profile
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/user/logout">
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
