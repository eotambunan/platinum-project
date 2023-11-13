import { useEffect, useState } from "react";
import Button from "./Button";

const Table = ({ data }) => {
    const [header, setHeader] = useState([]);
    const [dataTable, setDataTable] = useState([]);
    useEffect(() => {
        const fetchData = ()=>{
            if (data && data.length != 0) {
                const keys = Object.keys(data[0]);
                setHeader([...keys,"Action"]);
                const values = data.map((item) => Object.values(item)
                );
                setDataTable(values);
            }
        }
        fetchData()
    }, []);

    useEffect(()=>{console.log(dataTable)})
    const handleClickEdit = (id)=>{
        console.log(`silahkan update data dengan id ${id}`)
    }
    const handleClickDelete = (id)=>{
        console.log(`data dengan id : ${id} berhasil di delete`)
    }
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
                            <>
                                <tr key={index}>
                                    {items.map((item,index)=>{
                                        return (
                                            <td key={index}>{item}</td>
                                            )
                                        })}
                                        <td><Button type={"Api"} onClick={()=>handleClickEdit(index)}>Edit</Button><Button type={"Api"} onClick={()=>handleClickDelete(index)} >Delete</Button></td>
                                </tr>
                            </>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default Table;
