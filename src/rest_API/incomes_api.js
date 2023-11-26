import axios from "axios";
import Cookies from "js-cookie";

const cookies = Cookies.get('user-access')
let user_id
if(cookies){
    try {
        user_id = JSON.parse(cookies).id        
    } catch (error) {
        console.log(error);
    }
}
const url = "https://moneytracker.cyclic.app"

const getIncomeTotalMonthly = async () => {
    try {
    //    console.log(parsedCookies);
        const response = await axios.get(`${url}/api/income/v1/getall`, {
            params: {
                user_id
            },
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

const getIncomeMonthly = async () => {
    try {
    //    console.log(parsedCookies);
        const response = await axios.get(`${url}/api/income/v1/totalmonthly`, {
            params: {
                user_id
            },
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
};
// const api = axios.create({
//     baseURL:process.env.NEXT_PUBLIC_API_BASE_URL
// })

const addIncome = async ( payload ) => {
    try {
        // console.log(user_id);
        const response = await axios.post(`${url}/api/income/v1/add`, {
            user_id,
            wallet_id: payload.wallet_id,
            income_id: payload.income_id,
            amount: payload.amount,
            date_transaction: new Date(payload.date_transaction).toISOString(),
            description: payload.description,
        });
        
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

const deleteIncome=async (payload)=>{
    try {
        const response = await axios.delete(`${url}/api/income/v1/delete/${payload}`)    
        return response.data.data    
    } catch (error) {
        throw error
    }
}

const editIncomeApi = async (payload,id)=>{
    try {
        console.log(payload);
        console.log(id);
        const response = await axios.put(`${url}/api/income/v1/edit/${id}`,{
            user_id,
            wallet_id: payload.wallet_id,
            income_id: payload.income_id,
            amount: payload.amount,
            date_transaction: new Date(payload.date_transaction).toISOString(),
            description: payload.description,
        })
        return response.data.data
    } catch (error) {
        throw error
    }
}

export { getIncomeMonthly,getIncomeTotalMonthly, addIncome, deleteIncome, editIncomeApi };
