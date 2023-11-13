import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, LineElement, ArcElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, LineElement, ArcElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Chart = ({ type, labels, title, value, color }) => {
    let colorRandom = ["#FFC0CB","#AED6F1","#98FB98","#FFD700","#B19CD9","#D3D3D3", "#E6E6FA"]
    const data = {
        labels: labels,
        datasets: [
            {
                label: title,
                data: value,
                backgroundColor: (type==="Line"||type==="Bar")?color :colorRandom,
                borderColor: (type==="Line"||type==="Bar")?color :"white" ,
                pointBorderColor: "black",
                fill: true,
                tension: 0.3,
            },
        ],
    };
    const options = {
        plugin: {
            legend: true,
        },
        scales: {
            y: {
                min: value.reduce((a,b)=>Math.min(a,b)),
                max: Math.ceil(value.reduce((a,b)=>Math.max(a,b))*1.1),
            },
        },
    };
    return (
        <>
            {type === "Line" && <Line data={data} options={options}></Line>}
            {type === "Bar" && <Bar data={data} options={options}></Bar>}
            {type === "Doughnut" && <Doughnut data={data} options={options}></Doughnut>}
            {type === "Pie" && <Pie data={data} options={options}></Pie>}
        </>
    );
};

export default Chart;
