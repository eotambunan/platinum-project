// Navbar.js
import React from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header className={styles.header}>
      <h2 className={styles.logo}>Money Tracker</h2>
      <nav className={styles.navigation}>
        <a href="#">HOME</a>
        <a href="#">ABOUT</a>
        <button className={styles.btnLoginPopup}>LOGIN</button>
      </nav>
    </header>
  );
};

export default Navbar;
