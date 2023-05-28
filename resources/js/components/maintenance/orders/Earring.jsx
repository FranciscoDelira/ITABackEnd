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

    const [searchTerm, setSearchTerm] = useState("");
    const [earrings, setEarrings] = useState([]);
    const ruta = "http://localhost/ITABackEnd/public/api";

    useEffect(() => {
        getAllEarrings();
    }, [])

    const getAllEarrings = async () => {
        const response = await axios.get('http://localhost/ITABackEnd/public/api/workorder_showEarring',
        {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Accept': 'application/json',
              'Authorization':`Bearer ${localStorage.getItem('user-info')}`
            }
          });
        setEarrings(response.data);
        console.log(response.data);
    }

    const deleteEarring = async (id) => {
        await axios.delete(`${ruta}/workorder_destroy/${id}`, {});
        getAllEarrings();
    }

    const filteredActives = earrings.filter((earring) => {
        if (searchTerm === "") {
            return earring;
        } else if (
            earring.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
            earring.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            earring.requestDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
            earring.status.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return earring;
        }
    });

    //const for the table
    const handleClick = (id) => {
        const confirmar = window.confirm(`¿Deseas crear una orden de solicitud con el ID: ${id}?`);
    if (confirmar) {
      history.push(`http://localhost/ITABackEnd/public/newOrder/${id}`);
    }
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
                    {filteredActives.map((earring) => (
                        <tr key={earring.id} onClick={() => handleClick(earring.id)}>
                            <td> {earring.id} </td>
                            <td> {earring.requestDate} </td>
                            <td> {earring.area} </td>
                            <td> {earring.name} </td>
                            <td> {earring.requestDescription} </td>
                            <td> <img src={earring.evidence1} alt="signature" width={100} height={100} /> </td>
                            <td> <img src={earring.evidence2} alt="signature" width={100} height={100} /> </td>
                            <td> <img src={earring.evidence3} alt="signature" width={100} height={100} /> </td>
                            <td> {earring.status} </td>
                            <td>
                                <button
                                    onClick={() => deleteEarring(earring.id)}
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

export default Earring;