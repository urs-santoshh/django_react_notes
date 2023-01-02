import { createContext, useState } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //   const [authToken, setAuthToken] = useState();
  //   const [user, setUser] = useState();
  const changeAuthentication = (bool) => {
    setIsAuthenticated(bool);
  };
  const contextData = {
    isAuthenticated: isAuthenticated,
    // authToken: authToken,
    // user: user,
    changeAuthentication: changeAuthentication,
  };
  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};
export default UserContext;
