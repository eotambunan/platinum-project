import axios from "axios";

// const api = axios.create({
//     baseURL:process.env.NEXT_PUBLIC_API_BASE_URL
// })

const getExpanseTotalMonthly = async () => {
    try {
        const response = await axios.get("http://localhost:3001/api/expanse/v1/getall", {
            params: {
                user_id: 1,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

const addExpanse = async ( payload ) => {
    try {
        const response = await axios.post("http://localhost:3001/api/expanse/v1/add", {
            user_id: 1,
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
        const response = await axios.delete(`http://localhost:3001/api/expanse/v1/delete/${payload}`)    
        return response.data.data    
    } catch (error) {
        
    }
}

export { getExpanseTotalMonthly, addExpanse, deleteExpanse };
