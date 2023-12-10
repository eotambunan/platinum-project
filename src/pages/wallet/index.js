import { Row, Col, Spinner, Alert, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getWalletSaldo } from "@/rest_API/wallets_api";
import WalletSummaryContent from "@/components/elements/WalletSummaryContent";
import { AiFillBank } from "react-icons/ai";
import Graphic from "@/components/fragments/Graphic";
import ModalWallet from "@/components/elements/ModalWallet";
import Chart from "@/components/elements/Chart";
import Loading from "@/components/layouts/loading/Loading";
import styles from "./wallet.module.css";
import { checkAuth } from "@/utils/checkAuth";
import { useRouter } from "next/router";
const Wallet = () => {
  const [wallets, setWallets] = useState([]);
  const [monthlySaldoData, setMonthlySaldoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]);

  const router = useRouter()


  useEffect(() => {
    authenticated()
    fetchData();
  }, []);

  const authenticated = ()=>{
    const isAuthenticated = checkAuth()
    if(!isAuthenticated){
        router.push('/login')
    }
}

  const fetchData = async () => {
    try {
      const walletResponse = await getWalletSaldo();
      setWallets(walletResponse);

      const filteredDataForChart = walletResponse.map(
        ({ category, saldo }) => ({ category: category, value: saldo })
      );
      setChartData(filteredDataForChart);

      // const monthlySaldoResponse = await getSaldoMonthly();
      // setMonthlySaldoData(monthlySaldoResponse);
    } catch (error) {
      setError("Error fetching wallet data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Loading/>
    <Row>
      <Col>
          <Row xs={1} md={2} lg={3} className="g-4 mt-1">
            {wallets?.length > 0 ? (
              wallets.map((wallet) => (
                <Col key={wallet.id}>
                <Card className={styles.card}>
                  <Card.Body>
                    <Card.Title className={styles.cardTitle}>
                      {wallet.category}
                    </Card.Title>
                    <Card.Text className={styles.cardText}>
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
        {/* )} */}
        <Col>
          <div>
            <Card className="mt-4">
              <Card.Body>
                <h1>Saldo Monthly</h1>
                <ModalWallet fetchData={fetchData}></ModalWallet>
                <div>
                  <Chart
                    type={"Line"}
                    datas={chartData}
                    title={"Monthly Saldo"}
                    color={"green"}
                    width="80%"
                    height="80%"
                  />
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Col>
    </Row>
    </>
  );
};

export default Wallet;
