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
import { checkAuth } from "@/utils/checkAuth";

const expanses = () => {
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const router = useRouter()

  
  
  useEffect(() => {
    authenticated()
    fetchData();
  }, []);
  const authenticated = ()=>{
    const isAuthenticated = checkAuth()
    if(!isAuthenticated){
        router.push('/login')
    }
}

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
        <Col lg={{ span: 8, offset:0}} className="mt-4">
          <Card className={styles.chartContainer}>
              <h1 className={styles.pageTitle}>Expense By Category</h1>
              <TesExpanse fetchData={fetchData}>Add Expense</TesExpanse>
              <Chart
                type={"Bar"}
                title={"Expense"}
                color={"red"}
                datas={chartData}
              >
                Expenses by category monthly
              </Chart>
          </Card>
        </Col>
        <Col lg={{ span: 4, offset:0}} className="mt-4">
          <Card className={styles.sidebarContainer}>
              <h1 className={styles.pageTitle}>
                Filter Expense Category Monthly
              </h1>
              <BodyFormFilter datas={filterData} />
          </Card>
        </Col>
          <Card className={styles.tableContainer}>
              <h1 className={styles.pageTitle}>Recent Expanses</h1>
              <Table datas={tableData} fetchData={fetchData} slug={query.slug} type={"expanse"}>
              </Table>
          </Card>
      </Row>
    </div>
  );
};
export default expanses;
