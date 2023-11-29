import axios from "axios";
import Cookies from "js-cookie";

const cookies = Cookies.get("user-access");
let user_id;
if (cookies) {
  try {
    user_id = JSON.parse(cookies).id;
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
    const response = await axios.get(
      "http://localhost:3001/api/expanse/v1/getall",
      {
        params: {
          user_id: user_id,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const getExpanseRecent = async () => {
  try {
    await getToken()
    const response = await axios.get(
      "http://localhost:3001/api/expanse/v1/recent",
      {
        params: {
          user_id: user_id,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const editExpanseApi = async (payload, id) => {
  try {
    await getToken()
    const response = await axios.put(
      `http://localhost:3001/api/expanse/v1/edit/${id}`,
      {
        user_id,
        wallet_id: payload.wallet_id,
        expanses_id: payload.expanses_id,
        amount: payload.amount,
        date_transaction: new Date(payload.date_transaction).toISOString(),
        description: payload.description,
      }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const deleteExpanse = async (payload) => {
  try {
    await getToken()
    const response = await axios.delete(
      `http://localhost:3001/api/expanse/v1/delete/${payload}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const getIncomeTotalMonthly = async () => {
  try {
    await getToken()
    const response = await axios.get(
      "http://localhost:3001/api/income/v1/getall",
      {
        params: {
          user_id,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export {
  getExpanseTotalMonthly,
  getExpanseRecent,
  editExpanseApi,
  deleteExpanse,
  getIncomeTotalMonthly,
};
