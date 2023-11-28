import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

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
        const response = await axios.post(`${apiUrl}/users/v1/login`,{
            email : payload.email,
            password: payload.password
        })
        return response.data
    } catch (error) {
        throw error
    }
}

const registerApi = async(payload)=>{
    try {
        console.log(payload);
        const response = await axios.post(`${apiUrl}/users/v1/regis`,{
            name : payload.name,
            email : payload.email,
            password : payload.password,
            role : "setrip"
        })
        return response
    } catch (error) {
        throw error
    }
}

const uploadImage = async(data)=>{
    try {
        const response = await axios.post(`${apiUrl}/users/v1/cloudinary`,{
            file:data
        })
    } catch (error) {
        throw error

    }
}
const saveImage = async(data)=>{
    try {
        const response = await axios.put(`${apiUrl}/users/v1/cloudinary`,{
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
        const response = await axios.get(`${apiUrl}/users/v1/cloudinary`,{
            params: {id}
        })
        return response.data.data
    } catch (error) {
        throw error
    }
}

export {loginApi,getUserDetail,uploadImage,saveImage,registerApi}