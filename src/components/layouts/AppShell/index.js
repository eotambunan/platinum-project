import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";
import Sidebar from "../Sidebar";

// const { default: Sidebar } = require("../Sidebar");

const disabledSidebar = ["/", "/login"];

const AppShell = ({ children }) => {
    const { pathname } = useRouter();
    return (
        <>
         {/* <Row> */}
            {disabledSidebar.includes(pathname) ? (
                <Col md="12">{children}</Col>
            ) : (
                <>
                        <Sidebar />
                    <Col md={{ span: 11, offset: 1 }} sm="12" style={{padding:"1vw 8vw 1vw"}}>{children}</Col>
                </>
            )}
         {/* </Row> */}
        </>
    );
};
export default AppShell;
