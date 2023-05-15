import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";

import ActiveRequestsGray from '/src/IconsRequest/ActiveRequestsGray.png';
import RequestHistoryGray from '/src/IconsRequest/RequestHistoryGray.png';
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

const RequestHistory = () => {
    function testClickEvent(param) {
        alert('Row Click Event');
    }

    const [requestsHistory, setRequestsHistory] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getAllRequestsHistory();
    }, [])

    const getAllRequestsHistory = async () => {
        const response = await axios.get('http://localhost/ITAFrontEndWeb/public/api/workorder_showRequestHistory');
        setRequestsHistory(response.data);
        console.log(response.data);
    }

    const filteredActives = requestsHistory.filter((requestHistory) => {
        if (searchTerm === "") {
            return requestHistory;
        } else if (
            requestHistory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            requestHistory.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            requestHistory.requestDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
            requestHistory.status.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return requestHistory;
        }
    });


    return (
        <>
            <Nav>
                <Nav.Item>
                    <Stack direction='horizontal' align="center" style={{ padding: "3%" }} className="mx-auto">
                        <Row>
                            <Col md={6}>
                                <Nav.Link href='activeRequest'>
                                    <img className='col-mb-3 mx-auto' src={ActiveRequestsGray} width={280} height={90} />
                                </Nav.Link>
                            </Col>
                            <Col md={6}>
                                <Nav.Link href='requestHistory'>
                                    <img className='col-mb-3 mx-auto' src={RequestHistoryGray} width={280} height={90} />
                                </Nav.Link>
                            </Col>
                        </Row>
                    </Stack>
                </Nav.Item>
            </Nav>

            <input
                type="text"
                placeholder="Buscar..."
                onChange={(event) => {
                    setSearchTerm(event.target.value);
                }}
            />

            <Table responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha de solicitud</th>
                        <th>Solicitante</th>
                        <th>Departamento</th>
                        <th>Descripción</th>
                        <th>Fecha de liberación</th>
                        <th>Fecha de aprobación</th>
                        <th>Trabajo realizado por</th>
                        <th>Evidencia del empleado 1</th>
                        <th>Evidencia del empleado 2</th>
                        <th>Evidencia del empleado 3</th>
                        <th>Estatus</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredActives.map((requestHistory) => (
                        <tr key={requestHistory.id}>
                            <td> {requestHistory.id} </td>
                            <td> {requestHistory.requestDate} </td>
                            <td> {requestHistory.name} </td>
                            <td> {requestHistory.department} </td>
                            <td> {requestHistory.requestDescription} </td>
                            <td> {requestHistory.releasedDate} </td>
                            <td> {requestHistory.dateApproved} </td>
                            <td> {requestHistory.employeeName} </td>
                            <td> <img src={requestHistory.evidence1} alt="signature" width={100} height={100} /> </td>
                            <td> <img src={requestHistory.evidence2} alt="signature" width={100} height={100} /> </td>
                            <td> <img src={requestHistory.evidence3} alt="signature" width={100} height={100} /> </td>
                            <td> {requestHistory.status} </td>
                            <td>
                                <button
                                    onClick={() => deleteApproveds(active.id)}
                                    className="btn btn-danger"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default RequestHistory;