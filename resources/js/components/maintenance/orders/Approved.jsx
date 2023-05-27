import React from 'react';
import Table from 'react-bootstrap/Table';

import IconEarringsUser from '/src/IconsOrders/IconEarringsUser.png';
import IconReleasedUser from '/src/IconsOrders/IconReleasedUser.png';
import IconApprovedUser from '/src/IconsOrders/IconApprovedUser.png';
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import axios from "axios";

const ruta = "http://localhost/ITABackEnd/api";

const Approved = () => {

    const [approveds, setApproveds] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const ruta = "http://localhost/ITABackEnd/public/api";

    useEffect(() => {
        getAllApproveds();
    }, []);

    const getAllApproveds = async () => {
        const response = await axios.get('http://localhost/ITABackEnd/public/api/workorder_showApproved',
        { //acceder con el token
            headers: {
              'Content-Type': 'multipart/form-data',
              'Accept': 'application/json',
              'Authorization':`Bearer ${localStorage.getItem('user-info')}`
            }
          });
        setApproveds(response.data);
        console.log(response.data);
    };

    const deleteApproveds = async (id) => {
        await axios.delete(`${ruta}/workorder_destroy/${id}`, {});
        getAllApproveds();
    };

    /*const filteredApproveds = approveds.filter((approved) => {
        if (searchTerm === "") {
            return approved;
        } else if (
            approved.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
            approved.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            approved.requestDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
            approved.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            approved.status.toLowerCase().includes(searchTerm.toLowerCase()) 
        ) {
            return approved;
        }
    });*/

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
                        <th>Fecha solicitud</th>
                        <th>Área del solicitante</th>
                        <th>Nombre del solicitante</th>
                        <th>Descripción</th>
                        <th>Empleado</th>
                        <th>Evidencia 1</th>
                        <th>Evidencia 2</th>
                        <th>Evidencia 3</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {approveds.map((approved) => (
                        <tr key={approved.id}>
                            <td> {approved.id} </td>
                            <td> {approved.requestDate} </td>
                            <td> {approved.area} </td>
                            <td> {approved.name} </td>
                            <td> {approved.requestDescription} </td>
                            <td> {approved.employeeName} </td>
                            <td> <img src={approved.evidence1} alt="signature" width={100} height={100}/> </td>
                            <td> <img src={approved.evidence2} alt="signature" width={100} height={100}/> </td>
                            <td> <img src={approved.evidence3} alt="signature" width={100} height={100}/> </td>
                            <td> Aprobado </td>
                            <td>
                                
                                <button
                                    onClick={() => deleteApproveds(approved.id)}
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

export default Approved;