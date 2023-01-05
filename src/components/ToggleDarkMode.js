import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/ThemeContext";

export const ToogleModeButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [checkBox, setCheckBox] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  const handleToggle = (e) => {
    if (theme === "dark") {
      setTheme("light");
      setCheckBox(false)
    }
    if (theme === "light") {
      setTheme("dark")
      setCheckBox(true)
    }
    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme, checkBox]);

  return (
    <div className="toggle-button">
      <input
        type="checkbox"
        className="checkbox"
        name="checkBox"
        id="checkbox"
        checked={checkBox}
        onChange={handleToggle}
      />
      <label htmlFor="checkbox" className="label">
        <i className="fas fa-moon"></i>
        <i className="fas fa-sun"></i>
        <div className="ball"></div>
      </label>
    </div>
  );
};
