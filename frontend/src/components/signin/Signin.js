import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "./redux/disptacher";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const changeInputHandle = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmitButton = (e) => {
    e.preventDefault();
    dispatch(loginUser(userData, navigate));
  };

  return (
    <section
      className="login d-flex justify-content-center align-items-center"
      style={{ minHeight: "calc(100vh - 112px)" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-sm p-4">
              <h2 className="mb-4 text-center">Sign In</h2>
              <form onSubmit={handleSubmitButton}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    name="email"
                    value={userData.email}
                    onChange={changeInputHandle}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    name="password"
                    value={userData.password}
                    onChange={changeInputHandle}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Sign In
                </button>
              </form>
              <p className="mt-3 text-center">
                Create an account?{" "}
                <Link to="/signup" className="text-decoration-none">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signin;
