import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";

const { default: Sidebar } = require("../Sidebar");

const disabledSidebar = ["/", "/login"];

const AppShell = ({ children }) => {
    const { pathname } = useRouter();
    return (
        <Row>
            {disabledSidebar.includes(pathname) ? (
                <Col md="12">{children}</Col>
            ) : (
                <>
                    <Col md="2">
                        <Sidebar />
                    </Col>
                    <Col md="10">{children}</Col>
                </>
            )}
        </Row>
    );
};
export default AppShell;
