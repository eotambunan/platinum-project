import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";
import Sidebar from "../Sidebar";

import styles from "./appshell.module.css";

// const { default: Sidebar } = require("../Sidebar");

const disabledSidebar = ["/", "/login"];

const AppShell = ({ children }) => {
    const { pathname } = useRouter();
    return (
        <>
            {disabledSidebar.includes(pathname) ? (
                <Col md="12">{children}</Col>
            ) : (
                <div className={`${styles.container}`}>
                    {/* <div className={`${styles.sideBar}`}>cekk</div> */}
                    <Sidebar className={`${styles.sideBar}`} />
                    <Row className={`${styles.row}`}>
                        <Col lg={{ span: 10, offset:1}} md={{ span: 10, offset:1}} sm={{ span: 12, offset:0}} className={`${styles.col}`}>
                            {children}
                        </Col>
                    </Row>
                </div>
            )}
        </>
    );
};
export default AppShell;
