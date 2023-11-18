// import '@/styles/globals.css'
import AppShell from "@/components/layouts/AppShell";
import "bootstrap/dist/css/bootstrap.min.css";
import {SessionProvider} from "next-auth/react"

export default function App({ Component, pageProps:{session, ...pageProps} }) {
    return (
        <SessionProvider session={session}>
        <AppShell>
            <Component {...pageProps} />
        </AppShell>
        </SessionProvider>
    );
}
