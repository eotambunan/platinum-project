import BodyFormFilter from "@/components/elements/BodyFormFilter";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getIncomeTotalMonthly } from "@/rest_API/incomes_api";
import Chart from "@/components/elements/Chart";
import Table from "@/components/elements/Table";
import { useRouter } from "next/router";
import AddIncome from "@/components/elements/AddIncome";

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
        <Row>
            <Col md="8">
                <div>
                    <h1>ini adalah halaman Income</h1>
                    <AddIncome fetchData={fetchData}>Add Income</AddIncome>
                    <Chart type={"Bar"} title={"Income"} color={"green"} datas={chartData}>
                        Income by category monthly
                    </Chart>
                </div>
                <div>
                    <Table datas={tableData} fetchData={fetchData} slug={query.slug} type={"income"}>
                        ini adalah table history
                    </Table>
                </div>
            </Col>
            <Col md="4" style={{ backgroundColor: "grey" }}>
                <BodyFormFilter datas={filterData} />
            </Col>
        </Row>
    );
};
export default income;
