import { Row, Col, Spinner, Alert, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getSaldoMonthly, getWalletSaldo } from "@/rest_API/wallets_api";
import WalletSummaryContent from "@/components/elements/WalletSummaryContent";
import { AiFillBank } from "react-icons/ai";
import Graphic from "@/components/fragments/Graphic";
import ModalWallet from "@/components/elements/ModalWallet"
const Wallet = () => {
  const [wallets, setWallets] = useState([]);
  const [monthlySaldoData, setMonthlySaldoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const walletResponse = await getWalletSaldo();
        setWallets(walletResponse);

        const monthlySaldoResponse = await getSaldoMonthly();
        setMonthlySaldoData(monthlySaldoResponse);
      } catch (error) {
        setError("Error fetching wallet data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Row>
      <Col>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : wallets.length === 0 ? (
          <p>No wallet data available.</p>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4 mt-1">
            {wallets.map((wallet) => (
              <Col key={wallet.id}>
                <Card>
                  <Card.Body>
                    <Card.Title>{wallet.category}</Card.Title>
                    <Card.Text>
                      <WalletSummaryContent
                        value={wallet.saldo}
                        icon={<AiFillBank />}
                      />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
        <Col>
          <div>
            
            <h1>Saldo Monthly</h1>
            <ModalWallet></ModalWallet>
            <div style={{ width: '80%', height: '80%' }}>
               <Graphic
                type={"Line"}
                labels={monthlySaldoData.map((entry) => entry.month)}
                value={monthlySaldoData.map((entry) => entry.saldo)}
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
