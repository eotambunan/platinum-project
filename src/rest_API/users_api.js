import axios from "axios";

const loginApi = async(payload)=>{
    try {
        const response = await axios.post("http://localhost:3001/api/users/v1/login",{
            email : payload.email,
            password: payload.password
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export {loginApi}