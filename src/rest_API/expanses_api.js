import axios from "axios";
import Cookies from "js-cookie";
import { headers } from "../../next.config";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const cookies = Cookies.get('user-access')
let user_id
if(cookies){
    try {
        user_id = JSON.parse(cookies).id        
    } catch (error) {
        console.log(error);
    }
}

const getToken = async ()=>{
    const {token} = JSON.parse(cookies)
    if(token){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;    
    }
}

const getExpanseTotalMonthly = async () => {
  try {
    await getToken()
        const response = await axios.get(`${apiUrl}/expanse/v1/getall`, {
            params: {
                user_id
            },
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

const getExpanseMonthly = async () => {
    try {
        await getToken()
        const response = await axios.get(`${apiUrl}/expanse/v1/totalmonthly`, {
            params: {
                user_id
            },
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

const addExpanse = async ( payload ) => {
    try {
        await getToken()
        const response = await axios.post(`${apiUrl}/expanse/v1/add`, {
            user_id,
            wallet_id: payload.wallet_id,
            expanses_id: payload.expanses_id,
            amount: payload.amount,
            date_transaction: new Date(payload.date_transaction).toISOString(),
            description: payload.description,
        });
        
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

const deleteExpanse=async (payload)=>{
    try {
        await getToken()
        const response = await axios.delete(`${apiUrl}/expanse/v1/delete/${payload}`)    
        return response.data.data    
    } catch (error) {
        throw error
    }
}

const editExpanseApi = async (payload,id)=>{
    try {
        await getToken()
        const response = await axios.put(`${apiUrl}/expanse/v1/edit/${id}`,{
            user_id,
            wallet_id: payload.wallet_id,
            expanses_id: payload.expanses_id,
            amount: payload.amount,
            date_transaction: new Date(payload.date_transaction).toISOString(),
            description: payload.description,
        })
        return response.data.data
    } catch (error) {
        throw error
    }
}

export {getExpanseMonthly, getExpanseTotalMonthly, addExpanse, deleteExpanse, editExpanseApi };
