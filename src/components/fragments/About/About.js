// AboutUsSection.js
import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.title}>About Us</h2>
        <p className={styles.description}>
          We are dedicated to helping you manage your finances efficiently. Our
          money tracking app provides a simple and intuitive way to track
          expenses, set budgets, and achieve your financial goals.
        </p>
      </div>
    </section>
  );
};

export default About;
