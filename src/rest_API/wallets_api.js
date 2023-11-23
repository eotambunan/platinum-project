import axios from "axios";

export const getWalletSaldo = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/wallet/v1/walletsaldo",
      {
        params: {
          user_id: 1,
        },
      }
    );    
    return response.data.data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
// export const getSaldoMonthly = async () =>{
//     try {
//         const response = await axios.post(
//             "http://localhost:3000/api/wallet/v1/saldomonthly",
//             {
//               user_id: 1,
//             }
//         );
//         return response.data.data;
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// }

// export const createWallet = async(user_id,category,description) => {
//     try {
//         const response = await axios.post(
//             "http://localhost:3000/api/wallet/v1/add",
//             {
//                 user_id  , category, description
//             }
//         )
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// }

