import Header from "@/components/elements/Header";
import Table from "../elements/Table";

const History = (props)=>{
    const {children} = props
    return(
        <>
        <Header>{children}</Header>
        <Table/>
        </>
    )
}

export default History