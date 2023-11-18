import { useState } from "react";
import Button from "./Button";
import Graphic from "../fragments/Graphic";

const { Row, Col, Form } = require("react-bootstrap");

const BodyFormFilter = () => {
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [chartFilter, setChartFilter] = useState(null);
    const handleSelectedMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };
    const handleSelectedYearChange = (event) => {
        setSelectedYear(event.target.value);
    };
    const handleClick = () => {
        setChartFilter(`Bulan : ${selectedMonth} Tahun:${selectedYear}`);
        console.log(chartFilter);
    };
    const datas = [
        {category : "komik",value : 10000},
        {category : "novel",value : 10000},
        {category : "children",value : 10000},
        {category : "komik",value : 15000},
        {category : "komik",value : 20000},
    ]
    return (
        <Row>
            <Col>
                <div className="input-group mb-3">
                    <Form.Select className="form-select" id="inputGroupSelect01" value={selectedMonth} onChange={handleSelectedMonthChange}>
                        <option value="" disabled>
                            Month
                        </option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="Maret">Maret</option>
                    </Form.Select>
                </div>
            </Col>
            <Col>
                <Form.Select className="form-select" id="inputGroupSelect01" value={selectedYear} onChange={handleSelectedYearChange}>
                    <option value="" disabled>
                        Year
                    </option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                </Form.Select>
            </Col>
            <Button type={"Api"} onClick={handleClick}>
                Apply Filter
            </Button>
            <div className="mt-3">
                {!chartFilter&&<h1>data tidak ada</h1>}
                {chartFilter&&<Graphic type={"Pie"} datas={datas} title={"Expenses"} color={"red"}>Expenses by category monthly</Graphic>            
}
            </div>
        </Row>
    );
};

export default BodyFormFilter;
