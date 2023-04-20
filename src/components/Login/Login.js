import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import "./login.css";
const Login = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
  });
  const history = useNavigate();
  const dispatch = useDispatch();

  const handleFormOnSubmit = (e) => {
    e.preventDefault();
    dispatch(
      login({
        username: userDetails.username,
        email: userDetails.email,
      })
    );
    history("/home");
  };

  return (
    <>
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleFormOnSubmit}>
          <h1>Login User</h1>
          <input
            className="login-form-input"
            onChange={(e) =>
              setUserDetails({ ...userDetails, username: e.target.value })
            }
            name="username"
            type="text"
            placeholder="username"
          />
          <input
            className="login-form-input"
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
            name="email"
            type="email"
            placeholder="email"
          />
          <button className="login-form-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
