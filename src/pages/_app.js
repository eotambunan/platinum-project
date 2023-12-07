// import '@/styles/globals.css'
import AppShell from "@/components/layouts/AppShell";
import GlobalContext from "@/context/GlobalContext";
import { getCookie } from "@/utils/cookies";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
    const [isLogin, setIsLogin] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const userDataCookie = getCookie("user-access");
        if (userDataCookie) {
            setUserData(userDataCookie);
            setIsLogin(true);
        }
    }, []);
    return (
        <GlobalContext.Provider value={{ isLogin, setIsLogin, userData }}>
                <AppShell>
                    <Component {...pageProps} />
                </AppShell>
        </GlobalContext.Provider>
    );
}
