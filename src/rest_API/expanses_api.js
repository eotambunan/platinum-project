import axios from "axios";
import Cookies from "js-cookie";

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

const getExpanseTotalMonthly = async () => {
  try {
    //    console.log(parsedCookies);
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
    //    console.log(parsedCookies);
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
        // console.log(user_id);
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
        const response = await axios.delete(`${apiUrl}/expanse/v1/delete/${payload}`)    
        return response.data.data    
    } catch (error) {
        throw error
    }
}

const editExpanseApi = async (payload,id)=>{
    try {
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
