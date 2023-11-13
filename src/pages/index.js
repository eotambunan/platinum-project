import Button from "@/components/elements/Button";
import Chart from "@/components/elements/Chart";
import Table from "@/components/elements/Table";
import Graphic from "@/components/fragments/Graphic";
import History from "@/components/fragments/History";

export default function Home() {
      const dataTable = [
        {id:1,name:"Evander",NIK : "001"},
        {id:2,name:"Oktapian",NIK : "002"}
      ]
    return (
        <>
            <h1>Landing Page</h1>
            <div style={{ width: "500px" }}>
            <Graphic  type={"Pie"} labels={["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"]} title={"Income"} value={[10, 15, 12, 0, 8, 10, 20]} color={"red"}>ini adalah chart</Graphic>
            </div>
            <div>
                <History data={dataTable}>ini adalah history</History>
            </div>
            <div>
                <Button type={"Api"} onClick={()=>console.log("klik")}>ini adalah tombol hit API</Button>
                <Button type={"Modal"} target={"#exampleModal"}>ini adalah tombol Modal</Button>
            </div>
        </>
    );
}
