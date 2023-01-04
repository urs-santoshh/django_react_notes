import React, { useContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import AlertContext from "../context/AlertContext";
import UserContext from "../context/UserContext";
import fetchApi from "../api/fetchApi";

const Login = () => {
  const navigate = useNavigate();
  const { showAlert } = useContext(AlertContext);
  const { setUser, setAuthToken } = useContext(UserContext);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    const url = "http://127.0.0.1:8000/api/token/";
    e.preventDefault();
    try {
      const response = await fetchApi({
        url: url,
        reqMethod: "POST",
        userData: userData,
        access: null,
      });
      const data = await response.json();
      if (response.status === 200) {
        showAlert("User log in successful", "success");
        setAuthToken(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authToken", JSON.stringify(data));
        navigate("/");
      } else {
        showAlert("User credential doesnot match", "warning");
      }
    } catch (err) {
      showAlert(err.message, "warning");
    }
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
