import { deleteIncome } from "@/rest_API/incomes_api";
import { deleteExpanse } from "@/rest_API/expanses_api";

import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import EditExpanse from "./EditExpanse";
import EditIncome from "./EditIncome";

import styles from "./element.module.css";
import { getWallet } from "@/rest_API/wallets_api";

const Table = ({ datas, fetchData, slug, type }) => {
    const [header, setHeader] = useState([]);
    const [dataTable, setDataTable] = useState([]);
    const [editData, setEditData] = useState([]);
    const [walletCategory, setWalletCategory] = useState([]);

    useEffect(() => {}, datas);

    const wallets = async () => {
        const wallet = await getWallet();
        setWalletCategory(wallet);
    };

    useEffect(() => {
        wallets();
        if (datas && datas.length != 0) {
            const keys = Object.keys(datas[0]);
            const dataHeader = keys
                .filter((key) => key != "id")
                .map((key) =>
                    key === "wallet_id" ? "Wallet" : key === "expanses_id" ? "Expanses" : key === "date_transaction" ? "Date" : key === "amount" ? "Amount" : key === "description" ? "Description" : key === "income_id" ? "Income" : key
                );
            setHeader([...dataHeader, "Action"]);
            const dataForTable = datas.map((item) => {
                const matchWallet = walletCategory.find((w) => w.id === item.wallet_id);
                return {
                    ...item,
                    wallet_id: matchWallet ? matchWallet.category : item.id,
                };
            });
            setDataTable(dataForTable);
        }
    }, [datas]);

    useEffect(() => {
        getEditData();
    }, [slug]);

    const getEditData = () => {
        const editDataWithId = datas.filter((item) => item.id == slug);
        setEditData(editDataWithId)
    };
    const handleClickDelete = async (id) => {
        try {
            type == "expanse" ? await deleteExpanse(id) : await deleteIncome(id);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={`${styles.tableContainer}`}>
            <table className="table">
                <thead className="text-center">
                    <tr>
                        {header.map((item, index) => {
                            return (
                                <th scope="col" key={index}>
                                    {item}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody className="text-center">
                    {dataTable.length > 0 ? (
                        dataTable.map((items, index) => {
                            const {id,...newItems} = items
                            return (
                                <tr key={index}>
                                    {Object.values(newItems).map((item, index) => {
                                        return <td key={index} className={`${styles.td}`}>{item}</td>;
                                    })}
                                    <td className={`${styles.tdAction}`}>
                                        {type == "income" ? (
                                            <EditIncome id={items.id} datas={editData} fetchData={fetchData}>
                                                Edit
                                            </EditIncome>
                                        ) : (
                                            <EditExpanse id={items.id} datas={editData} fetchData={fetchData}>
                                                Edit
                                            </EditExpanse>
                                        )}
                                        <button onClick={() => handleClickDelete(items.id)}  className={`${styles.deleteButton}`}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={7}>Belum ada transaksi</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;

