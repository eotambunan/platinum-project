import { addExpanse } from "@/rest_API/expanses_api";
import { getWallet } from "@/rest_API/wallets_api";
import { fetchData } from "next-auth/client/_utils";

import { useState } from "react";
import { Col, Form, Row, Button, Modal } from "react-bootstrap";
import styles from "./element.module.css"

const TesExpanse = ({children,id, fetchData}) => {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [listWallet,setListWallet] = useState([])


  const handleClick = async (event)=>{
    event.preventDefault()
    const data = {wallet_id:wallet,expanses_id:category,amount,date_transaction: date,description}
    console.log(data);
    const response = await addExpanse(data)
    setWallet('');
    setCategory('');
    setAmount('');
    setDate('');
    setDescription('');
    fetchData()
    handleClose()
  }
  const handleClose = () => setShow(false);
  const handleShow = () => {
    fetchDataWallet()
    setShow(true)
  }

  const fetchDataWallet = async ()=>{
    const response = await getWallet()
    setListWallet(response)
  }
  return (
    <Row>
      <Col>
        {/* Button for trigger Modal */}
        {}
        <button className={`${styles.addButton}`} onClick={handleShow}>
          {children}
        </button>
        {/* Add Expense Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Expense</Modal.Title>
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
                  defaultValue=""
                >
                  <option value="" disabled hidden >Expanse Category</option>
                  <option value="Food & Drink">Food & Drink</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Housing">Housing</option>
                  <option value="Medical">Medical</option>
                  <option value="Investing">Investing</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Education">Education</option>
                  <option value="Gift & Donation">Gift & Donation</option>
                  <option value="Transport">Transport</option>
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
                  defaultValue=""
                >
                  <option value="" disabled hidden >Select Wallet</option>
                  {listWallet.map((item)=><option key={item.id} value={item.id}>{item.category}</option>)}
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
                <Button variant="primary" className="" type="submit" onClick={handleClick}>
                  Add Expense
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

export default TesExpanse;
