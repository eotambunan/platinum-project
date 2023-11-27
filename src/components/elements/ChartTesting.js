import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, LineElement, ArcElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(BarElement, LineElement, ArcElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ChartTesting = ({ type, title, color, datas, datass }) => {
    const [category, setCategory] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const [value, setValue] = useState([]);
    const [values,setValues] = useState([])

    useEffect(() => {
        const categoryTotalValue = datas.reduce((accumulator, currentItem) => {
            const { category, value } = currentItem;
            accumulator[category] = (accumulator[category] || 0) + value;
            return accumulator;
        }, {});
        const categoryTotalValues = datass.reduce((accumulator, currentItem) => {
            const { category, value } = currentItem;
            accumulator[category] = (accumulator[category] || 0) + value;
            return accumulator;
        }, {});

        const uniqueCategories = Object.keys(categoryTotalValue);
        const uniqueCategoriess = Object.keys(categoryTotalValues);
        const uniqueValues = Object.values(categoryTotalValue);
        const uniqueValuess = Object.values(categoryTotalValues);
        setCategory(uniqueCategories);
        setCategorys(uniqueCategoriess);
        setValue(uniqueValues);
        setValues(uniqueValuess);
    }, [datas,datass]);



    const data = {
        labels: category,
        datasets: [
            {
                label: "Income",
                data: value,
                backgroundColor: "green",
                borderColor: "green",
                pointBorderColor: "black",
                fill: true,
                tension: 0.3,
            },
            {
                label: "Expanse",
                data: values,
                backgroundColor: "red",
                borderColor: "red",
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
        // scales: {
        //     y: {
        //         min: Math.min(...value) * 0.9,
        //         max: Math.max(...value),
        //     },
        // },
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

export default ChartTesting;
