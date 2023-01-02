import React from "react";
import Alert from "../components/Alert";
import Navbar from "../components/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Alert />
      {children}
    </>
  );
};

export default Layout;
