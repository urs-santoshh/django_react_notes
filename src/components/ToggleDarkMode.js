import React, { useState } from "react";

export const ToogleModeButton = () => {
  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive((isActive) => !isActive);
    let toggleState = isActive ? "dark" : "light";
    document.body.className = toggleState;
  };

  return (
    <div className="toggle-button">
      <input
        type="checkbox"
        className="checkbox"
        id="checkbox"
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
