import axios from "axios";

const url = "http://localhost:3000"

export const getTotalMonthlyExpenses = async ()=>{
    try {
        const response = await axios.get(`${url}/api/expanse/v1/totalmonthly`)
        console.log(response);        
    } catch (error) {
        console.error('Error fetching total monthly expenses:', error);
    }
}