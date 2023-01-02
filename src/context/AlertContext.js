import { createContext, useState } from "react";

const AlertContext = createContext();

export function AlertContextProvider({ children }) {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => setAlert(null), 2000);
  };
  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export default AlertContext;
