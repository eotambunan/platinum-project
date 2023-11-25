import Chart from "@/components/elements/Chart";
import Header from "@/components/elements/Header";


const Graphic = (props)=>{
    const { type, title, color,children } = props
    return (
        <>
        <Header>{children}</Header>
        <Chart type={type} title={title} color={color}/>
        </>
    )
}

export default Graphic