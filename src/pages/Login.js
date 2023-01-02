import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../context/AlertContext";
import UserContext from "../context/UserContext";
import postRequest from "../api/postRequest";

const Login = () => {
  const navigate = useNavigate();
  const url = "http://127.0.0.1:8000/api/token/";
  const { showAlert } = useContext(AlertContext);
  const { changeAuthentication } = useContext(UserContext);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postRequest(url, userData)
      .then((response) => {
        if (response.status === 200) {
          showAlert("User logged in successfully", "success");
          changeAuthentication(true);
          navigate("/");
        } else {
          showAlert("User login was not successful", "warning");
        }
      })
      .catch((err) => {
        showAlert("User login was not successful", "warning");
        console.log(err.message);
      });

    // console.log(userData)
  };

  return (
    <div className="container mt-2">
      <h2 className="text-center">Login</h2>
      <p>Please login to continue</p>
      <form>
        <div className="mb-3">
          <label htmlFor="inputUsername1" className="form-label">
            Username
          </label>
          <input
            type="email"
            className="form-control"
            id="inputUsername1"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword1"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        {/* <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div> */}
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
