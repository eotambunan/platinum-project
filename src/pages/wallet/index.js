import { Row, Col, Spinner, Alert, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getWalletSaldo } from "@/rest_API/wallets_api";
import WalletSummaryContent from "@/components/elements/WalletSummaryContent";
import { AiFillBank } from "react-icons/ai";
import Graphic from "@/components/fragments/Graphic";
import ModalWallet from "@/components/elements/ModalWallet";
import Chart from "@/components/elements/Chart";
import Loading from "@/components/layouts/loading/Loading";
const Wallet = () => {
    const [wallets, setWallets] = useState([]);
    const [monthlySaldoData, setMonthlySaldoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartData,setChartData] = useState([])

    useEffect(() => {
      
      fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const walletResponse = await getWalletSaldo();
            setWallets(walletResponse);

            const filteredDataForChart = walletResponse.map(({category,saldo})=>({category:category, value : saldo}))
            setChartData(filteredDataForChart)

            // const monthlySaldoResponse = await getSaldoMonthly();
            // setMonthlySaldoData(monthlySaldoResponse);
        } catch (error) {
            setError("Error fetching wallet data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Row>
            <Loading/>
            <Col>
                { error ? (
                    <Alert variant="danger">{error}</Alert>
                ) : wallets && wallets.length === 0 ? (
                    <p>No wallet data available.</p>
                ) : (
                    <Row xs={1} md={2} lg={3} className="g-4 mt-1">
                        {wallets.length > 0 ? (
                            wallets.map((wallet) => (
                                <Col key={wallet.id}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>{wallet.category}</Card.Title>
                                            <Card.Text>
                                                <WalletSummaryContent value={wallet.saldo} icon={<AiFillBank />} />
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <p>No wallets available</p>
                        )}
                    </Row>
                )}
                <Col>
                    <div>
            
            <h1>Saldo Monthly</h1>
            <ModalWallet fetchData={fetchData}></ModalWallet>
            <div style={{ width: '80%', height: '80%' }}>
               <Chart
                type={"Line"}
                datas = {chartData}
                title={"Monthly Saldo"}
                color={"green"}
                width="80%"
                height="80%"
              />
              
            </div>
          </div>
                </Col>
            </Col>
        </Row>
    );
};

export default Wallet;
