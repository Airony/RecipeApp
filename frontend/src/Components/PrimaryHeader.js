import React, { useState } from "react";
import { Link } from "react-router-dom";

const PrimaryHeader = (props) => {
  const [navOpen, setNavOpen] = useState(false);
  console.log(navOpen);

  const handleHamburgerClick = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header>
      <button
        onClick={handleHamburgerClick}
        aria-expanded={navOpen}
        aria-label="open nav menu"
        className="menu-toggle menu-toggle-open"
      >
        <div
          className={"hamburger " + (navOpen ? "hamburger-open" : "")}
          aria-hidden={true}
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </button>
      <nav
        role="navigation"
        className={navOpen ? "nav-open" : ""}
        aria-hidden={!navOpen}
      >
        <Link to="/" className="navitem">
          Home
        </Link>
        <Link to="/recent" className="navitem">
          Recent
        </Link>
        <Link to="/about" className="navitem">
          About
        </Link>
      </nav>
      <h1 className="logo">Recipe App</h1>
      <button
        className="login-button button button-filled button-primary "
        aria-label="Login"
      >
        Login
      </button>
    </header>
  );
};

export default PrimaryHeader;
