import React from "react";
import { IconContext } from "react-icons";
import styles from "./element.module.css";
import { MdOutlineTrendingDown, MdOutlineTrendingUp } from "react-icons/md";
import WalletSummaryContent from "./WalletSummaryContent";

const WalletSummary = () => {
  const dataSummary = [
    {
      label: "Monthly Incomes",
      value: 20000000,
      icon: (
        <IconContext.Provider value={{ color: "black", size: "2rem" }}>
          <MdOutlineTrendingUp className={styles.icons} />
        </IconContext.Provider>
      ),
    },
    {
      label: "Monthly Expenses",
      value: 10000000,
      icon: (
        <IconContext.Provider value={{ color: "black", size: "2rem" }}>
          <MdOutlineTrendingDown className={styles.icons} />
        </IconContext.Provider>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      {dataSummary.map((data, index) => (
        <WalletSummaryContent
          key={index}
          summaryLabel={data.label}
          value={data.value}
          icon={data.icon}
        />
      ))}
    </div>
  );
};

export default WalletSummary;
