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

const ActiveRequests = () => {
    function testClickEvent(param) {
        alert('Row Click Event');
    }

    const [actives, setActives] = useState([]);

    useEffect(() => {
        getAllActives();
    }, [])

    const getAllActives = async () => {
        const response = await axios.get('http://localhost/ITAFrontEndWeb/public/api/maintenance_showActiveRequest');
        setActives(response.data);
        console.log(response.data);
    }
    
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

            <Table responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha de solicitud</th>
                        <th>Solicitante</th>
                        <th>Departamento</th>
                        <th>Descripción</th>
                        <th>Evidencia 1</th>
                        <th>Evidencia 2</th>
                        <th>Evidencia 3</th>
                        <th>Firma del solicitante</th>
                        <th>Estatus</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {actives.map((active) => (
                        <tr key={active.id}>
                            <td> {active.id} </td>
                            <td> {active.requestDate} </td>
                            <td> {active.name} </td>
                            <td> {active.department} </td>
                            <td> {active.requestDescription} </td>
                            <td> {active.evidence1} </td>
                            <td> {active.evidence2} </td>
                            <td> {active.evidence3} </td>
                            <td> {active.signature} </td>
                            <td> {active.status} </td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </>
    );
};

export default ActiveRequests;