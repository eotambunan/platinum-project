import styles from "./element.module.css";

const WalletSummaryContent = ({ summaryLabel, value, icon }) => {
  return (
    <div className={styles.summary}>
      <h3>{summaryLabel}</h3>
      <p>Rp.{value}</p>
      <ul>{icon}</ul>
    </div>
  );
};

export default WalletSummaryContent;
