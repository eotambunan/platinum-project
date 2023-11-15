import { IconContext } from "react-icons";
import styles from "./element.module.css";
import { MdOutlineTrendingDown, MdOutlineTrendingUp } from "react-icons/md";
import WalletSummaryContent from "./WalletSummaryContent";
import dataSummary from "@/utils/data/summary.json";

const WalletSummary = ({ summaryLabel, incomeValue, expenseValue }) => {
  return (
    <>
      <div className={styles.container}>
        {dataSummary.map((data, index) => {
          if (index == 0) {
            return (
              <WalletSummaryContent
                summaryLabel={data.label}
                value={data.value}
                icon={
                  <IconContext.Provider
                    value={{ color: "black", size: "2rem" }}
                  >
                    <MdOutlineTrendingUp className={styles.icons} />
                  </IconContext.Provider>
                }
              />
            );
          } else {
            return (
              <WalletSummaryContent
                summaryLabel={data.label}
                value={data.value}
                icon={
                  <IconContext.Provider
                    value={{ color: "black", size: "2rem" }}
                  >
                    <MdOutlineTrendingDown className={styles.icons} />
                  </IconContext.Provider>
                }
              />
            );
          }
        })}
      </div>
    </>
  );
};

export default WalletSummary;
{
  /* <WalletSummaryContent
  summaryLabel="Monthly Incomes"
  value="2000000"
  icon={
    <IconContext.Provider value={{ color: "black", size: "2rem" }}>
      <MdOutlineTrendingUp className={styles.icons} />
    </IconContext.Provider>
  }
/> */
}
{
  /* <div className={styles.expenseSummary}> */
}
{
  /* <h3>Monthly Expenses</h3>
  <p>Rp.10000000</p>
  <ul>
    <IconContext.Provider value={{ color: "black", size: "2rem" }}>
      <MdOutlineTrendingDown className={styles.icons} />
    </IconContext.Provider>
  </ul> */
}
{
  /* </div>
<div className={styles.incomeSummary}>
  <h3>Monthly Expenses</h3>
  <p>Rp.10000000</p>
  <ul>
    <IconContext.Provider value={{ color: "black", size: "2rem" }}>
      <MdOutlineTrendingUp className={styles.icons} />
    </IconContext.Provider>
  </ul>
</div> */
}
