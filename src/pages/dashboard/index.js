import { Col, Row ,Card} from "react-bootstrap";
import { getExpanseMonthly } from "@/rest_API/expanses_api";
import { getIncomeMonthly } from "@/rest_API/incomes_api";
import { useEffect, useState } from "react";
import Chart from "@/components/elements/Chart";
import ChartTesting from "@/components/elements/ChartTesting";
import Loading from "@/components/layouts/loading/Loading";
import styles from "./dashboard.module.css"

const dashboard = () => {
  const [chartExpanse, setChartExpanse] = useState([]);
  const [chartIncome, setChartIncome] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const responseExpanse = await getExpanseMonthly();
      const responseIncome = await getIncomeMonthly();

      const plotExpanse = responseExpanse.map((entry) => ({
        category: new Date(entry.month).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
        value: parseFloat(entry.total_amount),
      }));
      setChartExpanse(plotExpanse);
      const plotIncome = responseIncome.map((entry) => ({
        category: new Date(entry.month).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
        value: parseFloat(entry.total_amount),
      }));
      setChartIncome(plotIncome);
    } catch (error) {
      console.error(error);
    } finally{
    }
  };


  return (
    <div className={styles.pageContainer}>
    <Row>
      <Col md="6">
        <Card className={styles.chartCard}>
          <Card.Body>
            <h1 className={styles.chartTitle}>Monthly Expense</h1>
            <Chart
              type={"Bar"}
              title={"Expense"}
              color={"#FF6384"} 
              datas={chartExpanse}
              height={200} // Adjust the height as needed
            >
              Expenses monthly
            </Chart>
          </Card.Body>
        </Card>
      </Col>
      <Col md="6">
        <Card className={styles.chartCard}>
          <Card.Body>
            <h1 className={styles.chartTitle}>Monthly Income</h1>
            <Chart
              type={"Bar"}
              title={"Income"}
              color={"#4CAF50"} 
              datas={chartIncome}
              height={200} // Adjust the height as needed
            >
              Income monthly
            </Chart>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </div>
  );
};
export default dashboard;
