import React, { useState } from "react";
import { Link } from "react-router-dom";
import sharedStyles from "../styles/sharedStyles.module.scss";
import styles from "../styles/primaryHeader.module.scss";

const PrimaryHeader = (props) => {
  const [navOpen, setNavOpen] = useState(false);
  console.log(navOpen);

  const handleHamburgerClick = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className={styles.container}>
      <button
        onClick={handleHamburgerClick}
        aria-expanded={navOpen}
        aria-label="open nav menu"
        className={styles.menuToggle}
      >
        <div
          className={`${styles.hamburger} ${
            navOpen ? styles.hamburgerOpen : ""
          }`}
          aria-hidden={true}
        >
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
      </button>
      <nav
        role="navigation"
        className={`${styles.nav} ${navOpen ? styles.navOpen : ""}`}
        aria-hidden={!navOpen}
      >
        <Link to="/" className={styles.navItem}>
          Home
        </Link>
        <Link to="/recent" className={styles.navItem}>
          Recent
        </Link>
        <Link to="/about" className={styles.navItem}>
          About
        </Link>
      </nav>
      <h1 className={styles.logo}>Recipe App</h1>
      <button
        className={`${styles.loginButton} ${sharedStyles.button} ${sharedStyles.buttonPrimary}`}
        aria-label="Login"
      >
        Login
      </button>
    </header>
  );
};

export default PrimaryHeader;
