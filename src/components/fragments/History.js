import Header from "@/components/elements/Header";
import Table from "../elements/Table";

const History = (props)=>{
    const {children,data} = props
    return(
        <>
        <Header>{children}</Header>
        <Table data={data}/>
        </>
    )
}

export default History