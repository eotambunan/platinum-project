import { addExpanse, editExpanseApi } from "@/rest_API/expanses_api";
import { getWallet } from "@/rest_API/wallets_api";

import { fetchData } from "next-auth/client/_utils";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import { Col, Form, Row, Button, Modal } from "react-bootstrap";

import styles from './element.module.css'

const EditExpanse = ({ children, id, datas, fetchData }) => {
    const [show, setShow] = useState(false);
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("250");
    const [wallet, setWallet] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [currentData, setCurrentData] = useState([]);
    const [listWallet, setListWallet] = useState([]);
    const [isFormValid,setIsFormValid] = useState(false)


    useEffect(() => {

        if (datas.length > 0) {
            getCurrentData();
        }
    }, [datas]);
    useEffect(()=>{
        formValidation()
    },[amount,wallet,date,description])


    useEffect(() => {
        setCategory(currentData.expanses_id);
        setAmount(currentData.amount);
        setWallet(currentData.wallet_id);
        setDescription(currentData.description);
    }, [currentData]);

    const getCurrentData = () => {
        const [incomingData] = datas;
        setCurrentData(incomingData);
    };

    const fetchDataWallet = async () => {
        const response = await getWallet();
        setListWallet(response);
    };

    const formValidation = ()=>{
        if(category&&amount&&wallet&&date&&description){
            setIsFormValid(true)
        }
    }


    const handleClick = async (event) => {
        event.preventDefault();
        const data = { wallet_id: wallet, expanses_id: category, amount, date_transaction: date, description };
        console.log(data);
        console.log(id);
        const response = await editExpanseApi(data, id);
        fetchData();
        handleClose();
    };
    const handleClose = () => {
        router.push("/expanses");
        setShow(false);
    };
    const router = useRouter();
    const handleShow = () => {
        router.push(`/expanses/${id}`);
        fetchDataWallet()
        setShow(true);
    };

    return (
        <Row>
            <Col>
                {/* Button for trigger Modal */}
                <button className={`${styles.editButton}`} onClick={handleShow}>
                    {children}
                </button>
                {/* Add Expense Modal */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Expanse</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="mt-2">
                            <Form.Group className="mb-2">
                                <Form.Select
                                    aria-label="Default select example"
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                    }}
                                >
                                    <option value="" disabled hidden>
                                        Expanse Category
                                    </option>
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
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }}
                                    placeholder="Transaction Amount"
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Select
                                    aria-label="Default select example"
                                    value={wallet}
                                    onChange={(e) => {
                                        setWallet(e.target.value);
                                    }}
                                >
                                    <option value="" disabled hidden>
                                        Select Wallet
                                    </option>
                                    {listWallet.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.category}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    type="date"
                                    value={date}
                                    onChange={(e) => {
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
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <div className="d-flex justify-content-end flex-column">
                            <Button variant="primary" className="" type="submit" onClick={(event) => handleClick(event)} disabled={isFormValid?false:true}>
                                    Save Change
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

export default EditExpanse;
