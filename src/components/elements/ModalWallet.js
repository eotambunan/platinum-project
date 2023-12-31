import { useState } from "react";
import { Col, Form, Row, Button, Modal } from "react-bootstrap";
import { createWallet } from "@/rest_API/wallets_api"; // Import your API function for creating wallets
import styles from "./element.module.css"

const WalletForm = ({ fetchData }) => {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleClose = () => {
    setShow(false);
    // Reset form fields when the modal is closed
    setCategory("");
    setDescription("");
  };

  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API request to create a new wallet
      const payload = {category,description}
      const newWallet = await createWallet(payload);

      // Optionally, you can handle the response from the server, e.g., display a success message

      // Trigger a callback to notify the parent component that a new wallet has been created
      if (fetchData) {
        fetchData();
      }

      // Close the modal after submission
      handleClose();
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Error creating wallet:", error);
    }
  };

  return (
    <Row>
      <Col>
        {/* Button for trigger Modal */}
        <button className={`${styles.addButton}`} onClick={handleShow}>
          Add Wallet
        </button>
        {/* Add Expense Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Add Wallet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Control
                  required
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  required
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <div className="d-flex justify-content-end flex-column">
                <Button variant="primary" className="" type="submit">
                  Add Wallet
                </Button>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    </Row>
  );
};

export default WalletForm;
