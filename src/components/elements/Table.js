import { deleteExpanse } from "@/rest_API/expanses_api";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import TesExpanse from "./tesExpanse";


const Table = ({datas,onDataDeleted}) => {
    const [header, setHeader] = useState([]);
    const [dataTable, setDataTable] = useState([]);
    const [editData,setEditData] = useState([])


    useEffect(()=>{
        if(datas&&datas.length!=0){
            const keys = Object.keys(datas[0]);
            setHeader([...keys, "Action"]);
            setDataTable(datas)
        }

    },[datas])


    useEffect(()=>{
        const getEditData = (id)=>{
            const editDataWithId=data.filter(item=>item.id===id)
            setEditData(editDataWithId)
        }
    },[])
    const handleClickDelete = async (id) => {
        try {
            await deleteExpanse(id)
            onDataDeleted()
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
                    {dataTable.map((items, index) => {
                        return (
                            <tr key={index}>
                                {Object.values(items).map((item, index) => {
                                    return <td key={index}>{item}</td>;
                                })}
                                <td>
                                    <TesExpanse id={items.id}>Edit</TesExpanse>
                                    <Button onClick={() => handleClickDelete(items.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default Table;
