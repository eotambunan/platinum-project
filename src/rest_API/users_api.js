import axios from "axios";
import Cookies from "js-cookie";

const url = "https://moneytracker.cyclic.app"
const cookies = Cookies.get('user-access')
let id
if(cookies){
    try {
        id = JSON.parse(cookies).id        
    } catch (error) {
        console.log(error);
    }
}


const loginApi = async(payload)=>{
    try {
        const response = await axios.post(`${url}/api/users/v1/login`,{
            email : payload.email,
            password: payload.password
        })
        return response.data
    } catch (error) {
        throw error
    }
}

const uploadImage = async(data)=>{
    try {
        const response = await axios.post(`${url}/api/users/v1/cloudinary`,{
            file:data
        })
    } catch (error) {
        throw error

    }
}
const saveImage = async(data)=>{
    try {
        const response = await axios.put(`${url}/api/users/v1/cloudinary`,{
            id,
            user_image : data
        })
        return ("success")
    } catch (error) {
        throw error
    }
}

const getUserDetail = async()=>{
    try {
        const response = await axios.get(`${url}/api/users/v1/cloudinary`,{
            params: {id}
        })
        return response.data.data
    } catch (error) {
        throw error
    }
}

export {loginApi,getUserDetail,uploadImage,saveImage}