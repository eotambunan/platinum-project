import Cookies from "js-cookie"

export const checkAuth = ()=>{
    const cookie = Cookies.get('user-access')
    return cookie
}