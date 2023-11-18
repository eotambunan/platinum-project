import axios from "axios";

const url = "https://moneytracker.cyclic.app"

export const getTotalMonthlyExpenses = async ()=>{
    try {
        const accessToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('access-token=')).split('=')[1];
        const response = await axios.get(`${url}/api/expanse/v1/totalmonthly`,{
            headers: {
                'Cookie': `access-token=${accessToken}`
            }
        })
        console.log(response);      
    } catch (error) {
        console.error('Error fetching total monthly expenses:', error);
    }
}