import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, LineElement, ArcElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(BarElement, LineElement, ArcElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Chart = ({ type, title, color, datas }) => {
    const [category, setCategory] = useState([]);
    const [value, setValue] = useState([]);

    useEffect(() => {
        const categoryTotalValue = datas.reduce((accumulator, currentItem) => {
            const { category, value } = currentItem;
            accumulator[category] = (accumulator[category] || 0) + value;
            return accumulator;
        }, {});

        const uniqueCategories = Object.keys(categoryTotalValue);
        const uniqueValues = Object.values(categoryTotalValue);
        setCategory(uniqueCategories);
        setValue(uniqueValues);
    }, [datas]);

    let colorRandom = ["#FFC0CB", "#AED6F1", "#98FB98", "#FFD700", "#B19CD9", "#D3D3D3", "#E6E6FA"];
    const data = {
        labels: category,
        datasets: [
            {
                label: title,
                data: value,
                backgroundColor: type === "Line" || type === "Bar" ? color : colorRandom,
                borderColor: type === "Line" || type === "Bar" ? color : "white",
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
                min: Math.min(...value) * 0.9,
                max: Math.max(...value),
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
