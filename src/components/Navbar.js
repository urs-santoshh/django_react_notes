import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
import UserContext from "../context/UserContext";
import capFirstLetter from "../utils/capFirstLetter";
import { ToogleModeButton } from "./ToggleDarkMode";

const Navbar = () => {
  const { user, logoutUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const color = theme === "dark" ? "#1f2124" : "#2596be";

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        "backgroundColor": color,
      }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#/">
          Welcome {user ? `@${capFirstLetter(user.username)}` : null}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              {user ? (
                <NavLink className="nav-link" to="/login" onClick={logoutUser}>
                  Logout
                </NavLink>
              ) : (
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              <ToogleModeButton />
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-success"
              onClick={(e) => e.preventDefault()}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
