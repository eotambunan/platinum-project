import Cookies from "js-cookie";

export function setCookie(key,value,option){
    Cookies.set(key,value,option)
}

export function getCookie (key){
    return Cookies.get(key)
}

export function removeCookie(key){
    Cookies.remove(key)
}