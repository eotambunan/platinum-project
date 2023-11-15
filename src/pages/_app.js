// import '@/styles/globals.css'
import AppShell from "@/components/layouts/AppShell";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App({ Component, pageProps }) {
    return (
        <AppShell>
            <Component {...pageProps} />;
        </AppShell>
    );
}
