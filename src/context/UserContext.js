import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import fetchApi from "../api/fetchApi";

const UserContext = createContext();
export const UserContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem("authToken")
      ? jwt_decode(localStorage.getItem("authToken"))
      : null
  );

  const logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
  };

  const updateToken = async () => {
    console.log("updating token");
    const url = "http://127.0.0.1:8000/api/token/refresh/";
    const refreshToken = {
      refresh: authToken?.refresh,
    };
    const response = await fetchApi({
      url: url,
      reqMethod: "POST",
      userData: refreshToken,
      access: null,
    });
    const data = await response.json();
    if (response.status === 200) {
      setAuthToken(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authToken", JSON.stringify(data));
    } else {
      logoutUser();
    }
  };

  useEffect(() => {
    let time = 1000 * 60 * 4.2;
    let interval = setInterval(() => {
      if (authToken) {
        updateToken();
      }
    }, time);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  const contextData = {
    authToken: authToken,
    user: user,
    setUser: setUser,
    setAuthToken: setAuthToken,
    logoutUser: logoutUser,
  };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};
export default UserContext;
