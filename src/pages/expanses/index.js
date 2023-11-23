import Graphic from "@/components/fragments/Graphic";
import { getTotalMonthlyExpenses } from "@/rest_API/expanses_api";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";

const Expanses = () => {
  useEffect(() => {
    // Fetch the total monthly expenses with authentication token
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          // Handle case where token is not available
          console.error("Token not found");
          return;
        }

        const response = await getTotalMonthlyExpenses(token);
        console.log("Total Monthly Expenses:", response.data);
        // Process the response as needed
      } catch (error) {
        // Handle error
        console.error("Error fetching expenses:", error.response ? error.response.data : error.message);
      }
    };

    fetchExpenses();
  }, []);

  const data = [
    {
      category: "komik",
      value: 10000,
    },
    {
      category: "novel",
      value: 10000,
    },
    {
      category: "school",
      value: 10000,
    },
  ];

  return (
    <Row>
      <Col md="8">
        <h1>ini adalah halaman expanses</h1>
        <Graphic
          type={"Bar"}
          labels={["komik", "novel", "schooll", "komik", "novel", "schooll"]}
          title={"Expenses"}
          value={[23000, 20000, 21000, 23000, 20000, 21000]}
          color={"red"}
        >
          Expenses by category monthly
        </Graphic>
      </Col>
      <Col md="4" style={{ backgroundColor: "green" }}></Col>
    </Row>
  );
};

export default Expanses;
