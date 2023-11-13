import Chart from "@/components/elements/Chart";
import Header from "@/components/elements/Header";


const Graphic = (props)=>{
    const { type, labels, title, value, color,children } = props
    return (
        <>
        <Header>{children}</Header>
        <Chart type={type} labels={labels} title={title} value={value} color={color}/>
        </>
    )
}

export default Graphic