import { useEffect, useState } from "react";
import Button from "./Button";
import Graphic from "../fragments/Graphic";
import Chart from "./Chart";

const { Row, Col, Form } = require("react-bootstrap");

const BodyFormFilter = ({ datas }) => {
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [chartFilterData, setChartFilterData] = useState(null);

    const handleSelectedMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };
    const handleSelectedYearChange = (event) => {
        setSelectedYear(event.target.value);
    };
    const handleClick = () => {
        updateData()
        console.log(datas);
    };
    useEffect(()=>{
        updateData()
    },[datas])
    
    const updateData = ()=>{        
        const filteredData = datas.filter((item) => item.month === selectedMonth && item.year === selectedYear);
        setChartFilterData(filteredData);
    }


    return (
        <Row>
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
                </Form.Select>
            </Col>
            <button onClick={handleClick}>klik</button>
            <div className="mt-3">
                {!chartFilterData||chartFilterData.length==0 && <h1>data tidak ada</h1>}
                {chartFilterData && (
                    <Chart type={"Pie"} datas={chartFilterData} title={"Expenses"} color={"red"}>
                        Expenses by category monthly
                    </Chart>
                )}
            </div>
        </Row>
    );
};

export default BodyFormFilter;
