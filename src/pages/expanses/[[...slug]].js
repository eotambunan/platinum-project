import BodyFormFilter from "@/components/elements/BodyFormFilter";
import { Col, Row, Card } from "react-bootstrap";
import TesExpanse from "@/components/elements/AddExpanse";
import { useEffect, useState } from "react";
import { getExpanseTotalMonthly } from "@/rest_API/expanses_api";
import Chart from "@/components/elements/Chart";
import Table from "@/components/elements/Table";
import { useRouter } from "next/router";
import Loading from "@/components/layouts/loading/Loading";
import styles from "./expanse.module.css";

const expanses = () => {
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filterData, setFilterData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

  const fetchData = async () => {
    try {
      const response = await getExpanseTotalMonthly();
      // data for chart
      const filteredDatasForChart = response
        .map(({ id, user_id, wallet_id, ...rest }) => rest)
        .map(({ expanses_id, amount }) => ({
          category: expanses_id,
          value: amount,
        }));
      setChartData(filteredDatasForChart);

      // data for table
      const filteredDatasForTable = response.map(
        ({ user_id, createdAt, updatedAt, date_transaction, ...rest }) => ({
          ...rest,
          date_transaction: new Date(date_transaction).toLocaleDateString(),
        })
      );
      setTableData(filteredDatasForTable);

      // data for filter
      const filteredDatasForFilterFirst = response
        .map(
          ({
            user_id,
            createdAt,
            updatedAt,
            date_transaction,
            wallet_id,
            description,
            id,
            ...rest
          }) => ({
            ...rest,
            date_transaction: new Date(date_transaction).toLocaleDateString(),
          })
        )
        .map(({ expanses_id, amount, ...rest }) => ({
          category: expanses_id,
          value: amount,
          ...rest,
        }));
      const newData = filteredDatasForFilterFirst.map(
        ({ date_transaction, ...rest }) => {
          const month = date_transaction.split("/")[0];
          const year = date_transaction.split("/")[2];
          return { ...rest, month, year };
        }
      );
      setFilterData(newData);
    } catch (error) {
      console.error(error);
    }
  };

  const { query } = useRouter();
  return (
    <div className={styles.pageContainer}>
      <Row>
            <Loading/>
        <Col md="8" className="mt-4">
          <Card className={styles.chartContainer}>
            <Card.Body>
              <h1 className={styles.pageTitle}>Expanse By Category</h1>
              <TesExpanse fetchData={fetchData}>Add Expense</TesExpanse>
              <Chart
                type={"Bar"}
                title={"Expense"}
                color={"#3498db"} /* Blue color */
                datas={chartData}
                height={300} // Adjust the height as needed
              >
                Expenses by category monthly
              </Chart>
            </Card.Body>
          </Card>
          <Card className={styles.tableContainer}>
            <Card.Body>
              <h1 className={styles.pageTitle}>Recent Expanses</h1>
              <Table datas={tableData} fetchData={fetchData} slug={query.slug} type={"expanse"}>
                Ini adalah table history
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md="4"className="mt-4">
          <Card className={styles.sidebarContainer}>
            <Card.Body>
              <h1 className={styles.pageTitle}>
                Filter Expanse Category Monthly
              </h1>
              <BodyFormFilter datas={filterData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default expanses;
