import React from "react";
import styles from "./element.module.css";
import {Row } from "react-bootstrap";

const WalletSummaryContent = ({ summaryLabel, value, icon }) => {
  return (
    <div className={styles.WalletSummaryContent}>
      <div>
        <Row>
        <h3>{summaryLabel}</h3>
        {icon && <div className={styles.icon}>{icon}</div>}
        </Row>
      </div>
    
      <h3>Rp.{value}</h3>
      
    </div>
  );
};

export default WalletSummaryContent;
