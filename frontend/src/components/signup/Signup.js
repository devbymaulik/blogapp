import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "./redux/dispatcher";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const changeInputHandle = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmitButton = (e) => {
    e.preventDefault();
    dispatch(registerUser(userData, navigate));
  };

  return (
    <section
      className="register d-flex align-items-center justify-content-cente"
      style={{ minHeight: "calc(100vh - 112px)" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-sm p-4">
              <h2 className="mb-4 text-center">Sign Up</h2>
              <form onSubmit={handleSubmitButton}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your full name"
                    name="name"
                    value={userData.name}
                    onChange={changeInputHandle}
                    required
                  />
                </div>

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

                <div className="mb-3">
                  <label htmlFor="password2" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password2"
                    placeholder="Confirm your password"
                    name="password2"
                    value={userData.password2}
                    onChange={changeInputHandle}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Sign Up
                </button>
              </form>
              <p className="mt-3 text-center">
                Already have an account?{" "}
                <Link to="/signin" className="text-decoration-none">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
