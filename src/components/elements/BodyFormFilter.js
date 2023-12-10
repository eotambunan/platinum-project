import { useEffect, useState } from "react";
import Chart from "./Chart";
import styles from "./element.module.css"

const { Row, Col, Form } = require("react-bootstrap");

const BodyFormFilter = ({ datas }) => {
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [chartFilterData, setChartFilterData] = useState([]);
    

    const handleSelectedMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };
    const handleSelectedYearChange = (event) => {
        setSelectedYear(event.target.value);
    };
    const handleClick = () => {
        updateData(datas)
    };
    useEffect(()=>{
        if(datas){updateData(datas)}
    },[datas])
    
    const updateData = (datas)=>{
        const filteredData = datas.filter((item) => item.month == selectedMonth && item.year == selectedYear).map(item=>{
            console.log(item);
            return(
                item
            )
        });
        console.log(filteredData);
        setChartFilterData(filteredData);
    }


    return (
        <Row className={`${styles.container}`}>
            <Col>
                <div className="input-group mb-3">
                    <Form.Select className="form-select" id="inputGroupSelect01" value={selectedMonth} onChange={handleSelectedMonthChange}>
                        <option value="" disabled hidden>
                            Month
                        </option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">Maret</option>
                        <option value="4">April</option>
                        <option value="5">Mei</option>
                        <option value="6">Juni</option>
                        <option value="7">Juli</option>
                        <option value="8">Agustus</option>
                        <option value="9">September</option>
                        <option value="10">Oktober</option>
                        <option value="11">November</option>
                        <option value="12">Desember</option>
                    </Form.Select>
                </div>
            </Col>
            <Col>
                <Form.Select className="form-select" id="inputGroupSelect01" value={selectedYear} onChange={handleSelectedYearChange}>
                    <option value="" disabled hidden>
                        Year
                    </option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                </Form.Select>
            </Col>
            <button className={styles.filterButton} onClick={handleClick} onTouchEnd={handleClick} >Apply Filter</button>
            <div className={`${styles.chart}`}>
                {!chartFilterData||chartFilterData.length==0 && <h1>Transaction Not Found</h1>}
                {chartFilterData&&chartFilterData.length!==0 && (
                    <>
                    <Chart type={"Pie"} datas={chartFilterData} title={"Expenses"} color={"red"}>
                        Expenses by category monthly
                    </Chart>
                    </>
                )}
            </div>
        </Row>
    );
};

export default BodyFormFilter;
