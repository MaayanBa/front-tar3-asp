import React from 'react';
import { Form, Button, Table } from 'react-bootstrap';

export default function ERowsTable(props) {
    let rows = props.products.map((p, index) => {
        return <tr>
            <td>{index}</td>
            <td>{p.Name}</td>
            <td>{p.SerialNumber}</td>
            <td>{p.Price}</td>
            <td>{p.Cost}</td>
            <td>{p.Inventory}</td>
            <td>{p.SupplierId}</td>
        </tr>
    })


    return (
        <div>
           {rows}
        </div>
    )
}
