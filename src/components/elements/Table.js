import { deleteExpanse } from "@/rest_API/expanses_api";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import TesExpanse from "./AddExpanse";
import EditExpanse from "./EditExpanse";

const Table = ({ datas, fetchData, slug }) => {
    const [header, setHeader] = useState([]);
    const [dataTable, setDataTable] = useState([]);
    const [editData, setEditData] = useState([]);

    useEffect(() => {
        if (datas && datas.length != 0) {
            const keys = Object.keys(datas[0]);
            setHeader([...keys, "Action"]);
            setDataTable(datas);
        }
    }, [datas]);

    useEffect(() => {
        getEditData();
    }, [slug]);

    const getEditData = () => {
        const editDataWithId = datas.filter((item) => item.id == slug);
        setEditData(editDataWithId);
    };
    const handleClickDelete = async (id) => {
        try {
            await deleteExpanse(id);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <table className="table">
                <thead>
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
                <tbody>
                    {dataTable.length > 0 ? (
                        dataTable.map((items, index) => (
                            <tr key={index}>
                                {Object.values(items).map((item, index) => (
                                    <td key={index}>{item}</td>
                                ))}
                                <td>
                                    <EditExpanse id={items.id} datas={editData} fetchData={fetchData}>
                                        Edit
                                    </EditExpanse>
                                    <Button onClick={() => handleClickDelete(items.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>Belum ada transaksi</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default Table;
