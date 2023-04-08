import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

import { useState } from "react";
import { useEffect } from "react";

import "./Navbar.css";
const NavBar = (props) => {

  const navigate = useNavigate();
  return (
    <nav className="nav-bar">
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
      </ul>
      <div className="nav-right">
        {props.user ? (
          <button
            onClick={() => {
              localStorage.removeItem("userInfo");
              navigate("/login");
              props.setUser((val)=>!val);
            }}
          >
            Log Out
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Log In
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
