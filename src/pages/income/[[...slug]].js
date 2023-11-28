import BodyFormFilter from "@/components/elements/BodyFormFilter";
import { Col, Row,Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getIncomeTotalMonthly } from "@/rest_API/incomes_api";
import Chart from "@/components/elements/Chart";
import Table from "@/components/elements/Table";
import { useRouter } from "next/router";
import AddIncome from "@/components/elements/AddIncome";
import styles from "./income.module.css";

const income = () => {
    const [chartData, setChartData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [filterData, setFilterData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
    }, []);

    const fetchData = async () => {
        try {
            const response = await getIncomeTotalMonthly();

            // data for chart
            const filteredDatasForChart = response.map(({ id, user_id, wallet_id, ...rest }) => rest).map(({ income_id, amount }) => ({ category: income_id, value: amount }));
            setChartData(filteredDatasForChart);

            // data for table
            const filteredDatasForTable = response.map(({ user_id, createdAt, updatedAt, date_transaction, ...rest }) => ({ ...rest, date_transaction: new Date(date_transaction).toLocaleDateString() }));
            setTableData(filteredDatasForTable);

            // data for filter
            const filteredDatasForFilterFirst = response
                .map(({ user_id, createdAt, updatedAt, date_transaction, wallet_id, description, id, ...rest }) => ({ ...rest, date_transaction: new Date(date_transaction).toLocaleDateString() }))
                .map(({ income_id, amount, ...rest }) => ({ category: income_id, value: amount, ...rest }));
            const newData = filteredDatasForFilterFirst.map(({ date_transaction, ...rest }) => {
                const month = date_transaction.split("/")[0];
                const year = date_transaction.split("/")[2];
                return { ...rest, month, year };
            });
            setFilterData(newData);
        } catch (error) {
            console.error(error);
        }
    };

    const { query } = useRouter();
    return (
        <div className={styles.pageContainer}>
      <Row>
        <Col md="8" className="mt-4" >
          <Card className={styles.chartContainer}>
            <Card.Body>
              <h1 className={styles.pageTitle}>Income By Category</h1>
              <AddIncome fetchData={fetchData}>Add Income</AddIncome>
              <Chart
                type={"Bar"}
                title={"Income"}
                color={"#3498db"} /* Blue color */
                datas={chartData}
                height={300} // Adjust the height as needed
              >
                Incomes by category monthly
              </Chart>
            </Card.Body>
          </Card>
          <Card className={styles.tableContainer}>
            <Card.Body>
              <h1 className={styles.pageTitle}>Recent Income</h1>
              <Table datas={tableData} fetchData={fetchData} slug={query.slug}>
                Ini adalah table history
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md="4"className="mt-4">
          <Card className={styles.sidebarContainer}>
            <Card.Body>
              <h1 className={styles.pageTitle}>
                Filter Income Category Monthly
              </h1>
              <BodyFormFilter datas={filterData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
    );
};
export default income;
