import { loginApi } from "@/rest_API/users_api";
import { setCookie } from "@/utils/cookies";
import { Router, useRouter } from "next/router";
import { useState } from "react";

const login = ()=>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")


    const router = useRouter()
    const handleClick = async()=>{
        try {
            const payload = {email,password}
            const response = await loginApi(payload)
            setCookie("user-access",JSON.stringify(response.data),{
                expires : 1
            })
            router.push('/').then(() => router.reload());
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={handleClick}>submit</button>
        </>
    )
}

export default login