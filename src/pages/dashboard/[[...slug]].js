import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BodyFormFilter from "@/components/elements/BodyFormFilter";
import Chart from "@/components/elements/Chart";
import Table from "@/components/elements/Table";
import WalletSummary from "@/components/elements/WalletSummary";
import { getExpanseTotalMonthly } from "@/rest_API/expanses_api";
import { getIncomeTotalMonthly } from "@/rest_API/incomes_api";
import { useRouter } from "next/router";

const dashboard = () => {
  const [incomeChartData, setIncomeChartData] = useState([]);
  const [expenseChartData, setExpenseChartData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    try {
      const incomeResponse = await getIncomeTotalMonthly();
      const filteredDatasForIncomeChart = incomeResponse.map(
        ({ income_id, amount }) => ({
          category: income_id,
          value: amount,
        })
      );

      const expenseResponse = await getExpanseTotalMonthly();

      setIncomeChartData(filteredDatasForIncomeChart);

      const filteredDatasForExpenseChart = expenseResponse.map(
        ({ expanses_id, amount }) => ({
          category: expanses_id,
          value: amount,
        })
      );
      setExpenseChartData(filteredDatasForExpenseChart);

      const sortedExpenses = expenseResponse.sort(
        (a, b) => new Date(b.date_transaction) - new Date(a.date_transaction)
      );
      const recentExpenses = sortedExpenses.slice(0, 5);

      const filteredDatasForTable = recentExpenses.map(
        ({ date_transaction, ...rest }) => ({
          ...rest,
          date_transaction: new Date(date_transaction).toLocaleDateString(),
        })
      );
      setTableData(filteredDatasForTable);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Income Chart Data:", incomeChartData);
    console.log("Expense Chart Data:", expenseChartData);
    console.log("Table Data:", tableData);
  }, [incomeChartData, expenseChartData, tableData]);

  const { query } = useRouter();

  return (
    <>
      <h1>Dashboard Page</h1>
      <Row>
        <Col md="8">
          <WalletSummary />
          <div>
            <h1>Income Monthly</h1>
            <Chart
              type={"Line"}
              title={"Income"}
              color={"blue"}
              datas={incomeChartData}
            >
              Income by category monthly
            </Chart>
          </div>
          <div>
            <h1>Expenses Monthly</h1>
            <Chart
              type={"Bar"}
              title={"Expenses"}
              color={"red"}
              datas={expenseChartData}
            >
              Expenses by category monthly
            </Chart>
          </div>
          <div>
            <h1>Recent Expenses</h1>
            <Table datas={tableData} fetchData={fetchData} slug={query.slug}>
              Recent expenses
            </Table>
          </div>
        </Col>
        <Col md="4" style={{ backgroundColor: "grey" }}>
          <BodyFormFilter datas={filterData} />
        </Col>
      </Row>
    </>
  );
};

export default dashboard;
