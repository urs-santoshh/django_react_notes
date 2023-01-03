import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import postRequest from "../api/postRequest";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const url = "http://127.0.0.1:8000/api/token/refresh/";

  const [loading, setLoading] = useState(true);
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
    const refreshToken = {
      refresh: authToken?.refresh,
    };
    const response = await postRequest(url, refreshToken);
    const data = await response.json();
    if (response.status === 200) {
      setAuthToken(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authToken", JSON.stringify(data));
    } else {
      logoutUser();
    }
    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {

    if (loading) {
       updateToken();
      }

    let time = 1000 * 60 * 4.2;
    let interval = setInterval(() => {
      if (authToken) {
        updateToken();
      }
    }, time);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken, loading]);

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
