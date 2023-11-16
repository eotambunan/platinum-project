import axios from "axios";

const url = "https://moneytracker.cyclic.app"

export const getTotalMonthlyExpenses = async ()=>{
    try {
        const response = await axios.get(`${url}/api/expanse/v1/totalmonthly`)
        console.log(response);      
    } catch (error) {
        console.error('Error fetching total monthly expenses:', error);
    }
}