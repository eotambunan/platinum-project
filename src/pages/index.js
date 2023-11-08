import Chart from "@/components/elements/Chart";

export default function Home() {
    return (
        <>
            <h1>Landing Page</h1>
            <div style={{ width: "500px" }}>
                <Chart type={"Bar"} labels={["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"]} title={"Income"} value={[10, 15, 12, 0, 8, 10, 20]} color={"grey"} />
            </div>
        </>
    );
}
