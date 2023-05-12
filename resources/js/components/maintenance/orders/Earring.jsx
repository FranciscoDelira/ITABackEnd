import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";

import IconEarringsUser from '/src/IconsOrders/IconEarringsUser.png';
import IconReleasedUser from '/src/IconsOrders/IconReleasedUser.png';
import IconApprovedUser from '/src/IconsOrders/IconApprovedUser.png';
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

const Earring = () => {
    function testClickEvent(param) {
        alert('Row Click Event');
    }



    const [earrings, setEarrings] = useState([]);
    useEffect(() => {
        getAllEarrings();
    }, [])

    const getAllEarrings = async () => {
        const response = await axios.get('http://localhost/ITAFrontEndWeb/public/api/maintenance_showEarring');
        setEarrings(response.data);
        console.log(response.data);
    }

    const deleteApproveds = async (id) => {
        await axios.post(`${ruta}/workorder_destroy/${id}`, {});
        getAllEarrings();
    }

    const data = () => {
        return (
            <Col>Folio</Col>
        )
    };


    return (
        <>

            <Nav>
                <Nav.Item>
                    <Stack direction='horizontal' align="center" style={{ padding: "3%" }} className="mx-auto">

                        <Row>
                            <Col md={4}>
                                <Nav.Link href='earring'>
                                    <img className='col-mb-3 mx-auto' src={IconEarringsUser} width={280} height={90} />
                                </Nav.Link>
                            </Col>
                            <Col md={4}>
                                <Nav.Link href='release'>
                                    <img className='col-mb-3 mx-auto' src={IconReleasedUser} width={280} height={90} />
                                </Nav.Link>
                            </Col>
                            <Col md={4}>
                                <Nav.Link href='approved'>
                                    <img className='col-mb-3 mx-auto' src={IconApprovedUser} width={280} height={90} />
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
                        <th>Área solicitante</th>
                        <th>Nombre del solicitante</th>
                        <th>Descripción</th>
                        <th>Evidencia 1</th>
                        <th>Evidencia 2</th>
                        <th>Evidencia 3</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {earrings.map((earring) => (
                        <tr key={earring.id}>
                            <td> {earring.id} </td>
                            <td> {earring.requestDate} </td>
                            <td> {earring.area} </td>
                            <td> {earring.name} </td>
                            <td> {earring.requestDescription} </td>
                            <td> {earring.evidence1} </td>
                            <td> {earring.evidence2} </td>
                            <td> {earring.evidence3} </td>
                            <td> {earring.status} </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default Earring;