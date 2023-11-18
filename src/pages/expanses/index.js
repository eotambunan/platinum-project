import BodyFormFilter from "@/components/elements/BodyFormFilter"
import Graphic from "@/components/fragments/Graphic"
import History from "@/components/fragments/History"
import { getTotalMonthlyExpenses } from "@/rest_API/expanses_api"
import { useEffect } from "react"
import { Col, Row } from "react-bootstrap"


const expanses = ()=>{
    const datas = [
        {category : "komik",value : 10000},
        {category : "novel",value : 10000},
        {category : "children",value : 10000},
        {category : "komik",value : 15000},
        {category : "komik",value : 20000},
    ]

    return (
        <Row>
            <Col md="8">
                <div>
                    <h1>ini adalah halaman expanses</h1>
                    <Graphic type={"Bar"} datas = {datas} title={"Expenses"}  color={"red"}>Expenses by category monthly</Graphic>            
                </div>
                <div>
                    <History data={[{"No":1,"name" : "Evander","Age": 25},{"No":2,"name" : "Oktapian","Age": 26},{"No":3,"name" : "Bejo","Age": 25},{"No":4,"name" : "Joko","Age": 25},{"No":5,"name" : "Asep","Age": 25}]}>ini adalah table history</History>
                </div>
            </Col>
            <Col md="4" style={{backgroundColor:"grey"}}>
                <BodyFormFilter/>
            </Col>
        </Row>
    )
}

// type, labels, title, value, color,children

export default expanses