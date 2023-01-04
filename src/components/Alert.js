import React, { useContext } from "react";
import AlertContext from "../context/AlertContext";
import capFirstLetter from "../utils/capFirstLetter";

const Alert = () => {
  const { alert } = useContext(AlertContext);
  return (
    alert && (
      <div
        className={`alert alert-${alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{capFirstLetter(alert.type)}!</strong> {alert.message}
      </div>
    )
  );
};

export default Alert;
