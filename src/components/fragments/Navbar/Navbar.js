// Navbar.js
import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import GlobalContext from "@/context/GlobalContext";
import { removeCookie } from "@/utils/cookies";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter()
      const {isLogin} = useContext(GlobalContext)

      const logOut = ()=>{
        removeCookie('user-access')
        router.reload("/")
      }
    return (
        <header className={styles.header}>
            <h2 className={styles.logo}>Money Tracker</h2>
            <nav className={styles.navigation}>
                <a href="#">HOME</a>
                <a href="#">ABOUT</a>

                {isLogin==false ? <button className={styles.btnLoginPopup}><Link href="/login">Log In</Link></button>:<button onClick={logOut} className={styles.btnLoginPopup}>Log Out</button> }
            </nav>
        </header>
    );
};

export default Navbar;
