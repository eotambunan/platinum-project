import Graphic from "@/components/fragments/Graphic"
import { getTotalMonthlyExpenses } from "@/rest_API/expanses_api"
import { useEffect } from "react"
import { Col, Row } from "react-bootstrap"

const expanses = ()=>{

    useEffect(()=>{
        getTotalMonthlyExpenses()
    },[])


    const data = [
        {
            categorry : "komik",
            value : 10000
        },
        {
            categorry : "novel",
            value : 10000
        },
        {
            categorry : "school",
            value : 10000
        },
    ]
    return (
        <Row>
            <Col md="8">
        <h1>ini adalah halaman expanses</h1>
        <Graphic type={"Bar"} labels={["komik","novel","schooll","komik","novel","schooll"]} title={"Expenses"} value={[23000,20000,21000,23000,20000,21000]} color={"red"}>
            Expenses by category monthly
            </Graphic>            
            </Col>
            <Col md="4" style={{backgroundColor:"green"}}>
            </Col>
        </Row>
    )
}

// type, labels, title, value, color,children

export default expanses