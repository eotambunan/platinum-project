// Navbar.js
import React from "react";
import styles from "./Navbar.module.css";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const {data} = useSession() 
  return (
    <header className={styles.header}>
      <h2 className={styles.logo}>Money Tracker</h2>
      <nav className={styles.navigation}>
        <a href="#">HOME</a>
        <a href="#">ABOUT</a>
        {data?<button className={styles.btnLoginPopup} onClick={()=>{signOut()}}>Sign Out</button>:<button className={styles.btnLoginPopup} onClick={()=>{signIn()}}>Sign In</button>}
      </nav>
    </header>
  );
};

export default Navbar;
