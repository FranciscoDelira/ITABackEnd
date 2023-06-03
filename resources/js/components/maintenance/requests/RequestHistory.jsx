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
const RequestHistory = () => {

    const ruta = "http://localhost/ITABackEnd/public/api";
    const [requestsHistory, setRequestsHistory] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getAllRequestsHistory();
    }, [])

    const getAllRequestsHistory = async () => {
        const response = await axios.get('http://localhost/ITABackEnd/public/api/workorder_showRequestHistory',
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-info')}`
                }
            });
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

    const deleteRequestHistory = async (id) => {
        await axios.delete(`${ruta}/maintenance_destroy/${id}`).then(response => {
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
                        <th style={theme.ThStyle}>ID</th>
                        <th style={theme.ThStyle}>Fecha de solicitud</th>
                        <th style={theme.ThStyle}>Solicitante</th>
                        <th style={theme.ThStyle}>Departamento</th>
                        <th style={theme.ThStyle}>Descripción</th>
                        <th style={theme.ThStyle}>Fecha de liberación</th>
                        <th style={theme.ThStyle}>Fecha de aprobación</th>
                        <th style={theme.ThStyle}>Evidencia 1</th>
                        <th style={theme.ThStyle}>Evidencia 2</th>
                        <th style={theme.ThStyle}>Evidencia 3</th>
                        <th style={theme.ThStyle}>Estatus</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredActives.map((requestHistory) => (
                        <tr key={requestHistory.id}>
                            <td style={theme.ThStyle}> {requestHistory.id} </td>
                            <td style={theme.ThStyle}> {requestHistory.requestDate} </td>
                            <td style={theme.ThStyle}> {requestHistory.name} </td>
                            <td style={theme.ThStyle}> {requestHistory.department} </td>
                            <td style={theme.ThStyle}> {requestHistory.requestDescription} </td>
                            <td style={theme.ThStyle}> {requestHistory.releasedDate} </td>
                            <td style={theme.ThStyle}> {requestHistory.dateApproved} </td>
                            <td> <img src={`/ITABackEnd/storage/app/${requestHistory.evidence1}`} alt="evidence1" width={100} height={100} /> </td>
                            <td> <img src={`/ITABackEnd/storage/app/${requestHistory.evidence2}`} alt="evidence2" width={100} height={100} /> </td>
                            <td> <img src={`/ITABackEnd/storage/app/${requestHistory.evidence3}`} alt="evidence3" width={100} height={100} /> </td>
                            <td style={theme.ThStyle}> {requestHistory.status} </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default RequestHistory;