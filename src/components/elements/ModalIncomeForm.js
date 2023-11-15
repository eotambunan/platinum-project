import { useState } from "react";
import { Col, Form, Row, Button, Modal } from "react-bootstrap";

const IncomeForm = () => {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  // Example Modal Button Handler
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Row>
      <Col>
        {/* Button for trigger Modal */}
        <Button variant="primary" onClick={handleShow}>
          Add Income
        </Button>
        {/* Add Expense Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Income</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="mt-2">
              <Form.Group className="mb-2">
                <Form.Select
                  aria-label="Default select example"
                  value={category}
                  onChange={e => {
                    setCategory(e.target.value);
                  }}
                >
                  <option>Income Category</option>
                  {/* Example income option value */}
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="4">Three</option>
                  <option value="5">Three</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  required
                  type="number"
                  value={amount}
                  onChange={e => {
                    setAmount(e.target.value);
                  }}
                  placeholder="Transaction Amount"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Select
                  aria-label="Default select example"
                  value={wallet}
                  onChange={e => {
                    setWallet(e.target.value);
                  }}
                >
                  <option>Select Wallet</option>
                  {/* Example wallet option value */}
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  required
                  type="date"
                  value={date}
                  onChange={e => {
                    setDate(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  required
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={e => {
                    setDescription(e.target.value);
                  }}
                />
              </Form.Group>
              <div className="d-flex justify-content-end flex-column">
                <Button variant="primary" className="" type="submit">
                  Add Income
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

export default IncomeForm;
