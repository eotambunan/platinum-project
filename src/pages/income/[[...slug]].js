import BodyFormFilter from "@/components/elements/BodyFormFilter";
import { Col, Row,Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getIncomeTotalMonthly } from "@/rest_API/incomes_api";
import Chart from "@/components/elements/Chart";
import Table from "@/components/elements/Table";
import { useRouter } from "next/router";
import AddIncome from "@/components/elements/AddIncome";
import Loading from "@/components/layouts/loading/Loading";
import styles from "./income.module.css";
import { checkAuth } from "@/utils/checkAuth";

const income = () => {
    const [chartData, setChartData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [filterData, setFilterData] = useState([]);

    const router = useRouter()


    useEffect(() => {
      authenticated();
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
            const response = await getIncomeTotalMonthly();

            // data for chart
            const filteredDatasForChart = response.map(({ id, user_id, wallet_id, ...rest }) => rest).map(({ income_id, amount }) => ({ category: income_id, value: amount }));
            setChartData(filteredDatasForChart);

            // data for table
            const filteredDatasForTable = response.map(({ user_id, createdAt, updatedAt, date_transaction, ...rest }) => {
              const formatedDate = new Date(date_transaction);
              const day = formatedDate.getDate();
              const month = formatedDate.getMonth() + 1;
              const year = formatedDate.getFullYear();
              const fixDate = `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;
              return {
                  ...rest,
                  date_transaction: fixDate,
              };
          });
          setTableData(filteredDatasForTable);

            // data for filter
            const filteredDatasForFilterFirst = response
                .map(({ user_id, createdAt, updatedAt, date_transaction, wallet_id, description, id, ...rest }) => {
                    const formatedDate = new Date(date_transaction);
                    const day = formatedDate.getDate();
                    const month = formatedDate.getMonth() + 1;
                    const year = formatedDate.getFullYear();
                    const fixDate = `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;
                    return {
                        ...rest,
                        date_transaction: fixDate,
                    };
                })
                .map(({ income_id, amount, ...rest }) => ({
                    category: income_id,
                    value: amount,
                    ...rest,
                }));
            const newData = filteredDatasForFilterFirst.map(({ date_transaction, ...rest }) => {
                const month = date_transaction.split("/")[1];
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
      <>
      <Loading/>
        <div className={styles.pageContainer}>
      <Row>
        <Col  lg={{ span: 8, offset:0}} className="mt-4" >
          <Card className={styles.chartContainer}>
              <h1 className={styles.pageTitle}>Income By Category</h1>
              <AddIncome fetchData={fetchData}>Add Income</AddIncome>
              <Chart
                type={"Bar"}
                title={"Income"}
                color={"#3498db"}
                datas={chartData}
              >
                Incomes by category monthly
              </Chart>
          </Card>
        </Col>
        <Col lg={{ span: 4, offset:0}} className="mt-4">
          <Card className={styles.sidebarContainer}>
              <h1 className={styles.pageTitle}>
                Filter Income Category Monthly
              </h1>
              <BodyFormFilter datas={filterData} />
          </Card>
        </Col>
          <Card className={styles.tableContainer}>
            <Card.Body>
              <h1 className={styles.pageTitle}>Recent Income</h1>
              <Table datas={tableData} fetchData={fetchData} slug={query.slug} type={"income"}>
              </Table>
            </Card.Body>
          </Card>
      </Row>
    </div>
      </>
    );
};
export default income;
