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

const theme={
    ThStyle:{
        fontFamily:'Montserrat'
    },
    TdStyle:{
        fontFamily:'Montserrat'
    }
}

const ActiveRequests = () => {

    const handleDelete = (id) => {

        if (window.confirm('¿Estás seguro de que deseas eliminar este elemento?')) {

            deleteActiveRequest(id);

        }

    };

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
        await axios.delete(`${ruta}/maintenance_destroy/${id}`).then(response => {
            console.log(`Eliminacion exitosa`);
        }).catch(error => {
            console.error(`Error al eliminar la request `, error);
        });
    }

    //const for the table
    const handleClick = (id) => {
        const confirmar = window.confirm(`¿Deseas crear una orden de solicitud con el ID: ${id}?`);
    if (confirmar) {
        window.location.href = `http://localhost/ITABackEnd/public/newOrder/${id}`;
    }
      };

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
                        <th style={theme.ThStyle}>ID</th>
                        <th style={theme.ThStyle}>Fecha de solicitud</th>
                        <th style={theme.ThStyle}>Solicitante</th>
                        <th style={theme.ThStyle}>Departamento</th>
                        <th style={theme.ThStyle}>Descripción</th>
                        <th style={theme.ThStyle}>Evidencia 1</th>
                        <th style={theme.ThStyle}>Evidencia 2</th>
                        <th style={theme.ThStyle}>Evidencia 3</th>
                        <th style={theme.ThStyle}>Firma del solicitante</th>
                        <th style={theme.ThStyle}>Estatus</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredActives.map((active) => (
                        <tr key={active.id} onClick={() => handleClick(active.id)}>
                            <td style={theme.TdStyle}> {active.id} </td>
                            <td style={theme.TdStyle}> {active.requestDate} </td>
                            <td style={theme.TdStyle}> {active.name} </td>
                            <td style={theme.TdStyle}> {active.department} </td>
                            <td style={theme.TdStyle}> {active.requestDescription} </td>
                            <td> <img src={`/ITABackEnd/storage/app/${active.evidence1}`} alt="evidence1" width={100} height={100} /> </td>
                            <td> <img src={`/ITABackEnd/storage/app/${active.evidence2}`} alt="evidence2" width={100} height={100} /> </td>
                            <td> <img src={`/ITABackEnd/storage/app/${active.evidence3}`} alt="evidence3" width={100} height={100} /> </td>
                            <td> <img src={`/ITABackEnd/public/${active.signature}`} alt="signature" width={100} height={100} /> </td>
                            <td style={theme.TdStyle}> {active.status} </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </>
    );
};

export default ActiveRequests;