import React from "react";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={`${styles.wrapper}`}>
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>A Simple Way To Manage Your Money</h1>
        <p className={styles.subtitle}>
          Track your expenses and manage your finances with ease.
        </p>
      </div>
    </section>
    </div>
  );
};

export default Hero;
