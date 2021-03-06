import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      {" | "}
      <NavLink to="/register">Register</NavLink>
      {" | "}
      <NavLink to="/signin">Sign In</NavLink>
      {" | "}
      <NavLink to="/signup">Sign Up</NavLink>
    </div>
  );
};

export default Header;
