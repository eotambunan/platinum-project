import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const cookies = Cookies.get("user-access");
let user_id;
if (cookies) {
    try {
        user_id = JSON.parse(cookies).id;
    } catch (error) {
        console.log(error);
    }
}
export const getWallet = async ()=>{
  try {
    const response = await axios.get(`${apiUrl}/wallet/v1/getWallet`,{
      params: {
        user_id,
    },
    })
    return response.data.data
    } catch (error) {
      console.error("Error fetching data:", error);
  }
}




export const getWalletSaldo = async () => {
    try {
        const response = await axios.get(`${apiUrl}/wallet/v1/walletsaldo`, {
            params: {
                user_id: user_id,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// export const getSaldoMonthly = async () =>{
//     try {
//         const response = await axios.post(
//             `${url}/api/wallet/v1/saldomonthly",
//             {
//               user_id: 1,
//             }
//         );
//         return response.data.data;
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// }

export const createWallet = async (payload) => {
    try {
        const response = await axios.post(`${apiUrl}/wallet/v1/addwallet`, {
            user_id: user_id,
            category: payload.category,
            description: payload.description,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
