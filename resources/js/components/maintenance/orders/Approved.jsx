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
import { Button } from 'react-bootstrap';

import axios from "axios";
const theme={
    ThStyle:{
        fontFamily:'Montserrat'
    },
    TdStyle:{
        fontFamily:'Montserrat'
    }
}

const Approved = () => {

    const [approveds, setApproveds] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getAllApproveds();
    }, []);

    const getAllApproveds = async () => {
        const response = await axios.get('http://localhost/ITABackEnd/public/api/workorder_showApproved',
        { 
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

    const handleClick = (id) => {
        const confirmar = window.confirm(`¿Deseas ver el resumen de la orden con el ID: ${id}?`);
        if (confirmar) {
            window.location.href = `http://localhost/ITABackEnd/public/summaryOrder/${id}`;
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
                        <th style={theme.ThStyle}>ID</th>
                        <th style={theme.ThStyle}>Fecha solicitud</th>
                        <th style={theme.ThStyle}>Área del solicitante</th>
                        <th style={theme.ThStyle}>Nombre del solicitante</th>
                        <th style={theme.ThStyle}>Descripción</th>
                        <th style={theme.ThStyle}>Aprobó</th>
                        <th style={theme.ThStyle}>Evidencia 1</th>
                        <th style={theme.ThStyle}>Evidencia 2</th>
                        <th style={theme.ThStyle}>Evidencia 3</th>
                        <th style={theme.ThStyle}>Estado</th>
                        <th style={theme.ThStyle}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {approveds.map((approved) => (
                        <tr key={approved.id}>
                            <td style={theme.TdStyle} onClick={() => handleClick(approved.id)}> {approved.id} </td>
                            <td style={theme.TdStyle} onClick={() => handleClick(approved.id)}> {approved.requestDate} </td>
                            <td style={theme.TdStyle} onClick={() => handleClick(approved.id)}> {approved.area} </td>
                            <td style={theme.TdStyle} onClick={() => handleClick(approved.id)}> {approved.name} </td>
                            <td style={theme.TdStyle} onClick={() => handleClick(approved.id)}> {approved.requestDescription} </td>
                            <td style={theme.TdStyle} onClick={() => handleClick(approved.id)}> {approved.approversName} </td>
                            <td> <img src={`/ITABackEnd/storage/app/${approved.evidence1}`} onClick={() => handleClick(approved.id)} alt="signature" width={100} height={100}/> </td>
                            <td> <img src={`/ITABackEnd/storage/app/${approved.evidence2}`} onClick={() => handleClick(approved.id)} alt="signature" width={100} height={100}/> </td>
                            <td> <img src={`/ITABackEnd/storage/app/${approved.evidence3}`} onClick={() => handleClick(approved.id)} alt="signature" width={100} height={100}/> </td>
                            <td style={theme.TdStyle}> Aprobado </td>
                            <td>
                                <Stack direction='horizontal'>
                                    <Button style={{ backgroundColor: 'white', color: '#1B396A', fontFamily: 'Montserrat', height: 40, width: 90 }}
                                        onClick={() => deleteApproveds(approved.id)}
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

export default Approved;