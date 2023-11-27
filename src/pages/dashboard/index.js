import { Col, Row } from "react-bootstrap";
import { getExpanseMonthly } from "@/rest_API/expanses_api";
import { getIncomeMonthly } from "@/rest_API/incomes_api";
import { useEffect, useState } from "react";
import Chart from "@/components/elements/Chart";

const dashboard = () => {
  const [chartExpanse, setChartExpanse] = useState([]);
  const [chartIncome, setChartIncome] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    console.log("ok");
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
    }
  };

  return (
    <Row>
      <Col md="8">
        <div>
          <h1>Monthly Expanse</h1>
          <Chart
            type={"Bar"}
            title={"Expanse"}
            color={"red"}
            datas={chartExpanse}
          >
            Expanses monthly
          </Chart>
        </div>
        <div>
          <h1>Monthly Income</h1>
          <Chart
            type={"Bar"}
            title={"Income"}
            color={"green"}
            datas={chartIncome}
          >
            Expanses monthly
          </Chart>
        </div>
      </Col>
    </Row>
  );
};
export default dashboard;
