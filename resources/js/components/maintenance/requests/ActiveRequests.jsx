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
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';

const ActiveRequests = () => {
    function testClickEvent(param) {
        alert('Row Click Event');
    }

    const ruta = "http://localhost/ITABackEnd/public/api";
    const [actives, setActives] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getAllActives();
    }, [])

    const getAllActives = async () => {
        const response = await axios.get('http://localhost/ITABackEnd/public/api/maintenance_showActiveRequest',
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-info')}`
                }
            });
        setActives(response.data);
        console.log(response.data);
    }

    const filteredActives = actives.filter((active) => {
        if (searchTerm === "") {
            return active;
        } else if (
            active.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            active.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            active.requestDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
            active.status.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return active;
        }
    });

    const deleteActiveRequest = async (id) => {
        await axios.delete(`${ruta}/maintenance_destroy/${id}`,
        {
            headers:{
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user-info')}`
            }
        }
        ).then(response => {
            console.log(`Eliminacion exitosa`);
        }).catch(error => {
            console.error(`Error al eliminar la request `, error);
        });
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
                        <th>Evidencia 1</th>
                        <th>Evidencia 2</th>
                        <th>Evidencia 3</th>
                        <th>Firma del solicitante</th>
                        <th>Estatus</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredActives.map((active) => (
                        <tr key={active.id}>
                            <td> {active.id} </td>
                            <td> {active.requestDate} </td>
                            <td> {active.name} </td>
                            <td> {active.department} </td>
                            <td> {active.requestDescription} </td>
                            <td> <img src={`/ITABackEnd/storage/app/${active.evidence1}`} alt="signature" width={100} height={100} /> </td>
                            <td> <img src={`/ITABackEnd/storage/app/${active.evidence2}`} alt="signature" width={100} height={100} /> </td>
                            <td> <img src={`/ITABackEnd/storage/app/${active.evidence3}`} alt="signature" width={100} height={100} /> </td>
                            <td> <img src={`/ITABackEnd/storage/app/${active.signature}`} alt="signature" width={100} height={100} /> </td>
                            <td> {active.status} </td>
                            <td>
                                <Stack direction='horizontal'>
                                    <Button style={{ backgroundColor: '#1B396A', color: 'white', fontFamily: 'Montserrat', margin: '10%', height: 40, width: 100 }} as={Link} to={`http://localhost/ITABackEnd/public/newOrder/${active.id}`} >
                                        Orden
                                    </Button>
                                    <Button style={{ backgroundColor: 'white', color: '#1B396A', fontFamily: 'Montserrat', height: 40, width: 90 }}
                                        onClick={() => deleteRelease(release.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </Stack>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </>
    );
};

export default ActiveRequests;