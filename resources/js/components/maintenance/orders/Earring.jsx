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

const theme={
    ThStyle:{
        fontFamily:'Montserrat'
    },
    TdStyle:{
        fontFamily:'Montserrat'
    }
}

const Earring = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [earrings, setEarrings] = useState([]);
    const ruta = "http://localhost/ITABackEnd/public/api";
    useEffect(() => {
        getAllEarrings();
        console.log('TODOS LOS DATOS',earrings);
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
        await axios.delete(`${ruta}/workorder_destroy/${id}`);
        getAllEarrings();
    }

    const handleClick = (id) => {
        const confirmar = window.confirm(`¿Deseas eliminar la orden de solicitud con el ID: ${id}?`);
        if (confirmar) {
            deleteEarring(id);
        }
    };

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
                        <th style={theme.ThStyle}>Evidencia 1</th>
                        <th style={theme.ThStyle}>Evidencia 2</th>
                        <th style={theme.ThStyle}>Evidencia 3</th>
                        <th style={theme.ThStyle}>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredActives.map((earring) => (
                        <tr key={earring.id} onClick={() => handleClick(earring.id)}>
                            <td  style={theme.TdStyle}> {earring.id} </td>
                            <td  style={theme.TdStyle}> {earring.requestDate} </td>
                            <td  style={theme.TdStyle}> {earring.area} </td>
                            <td  style={theme.TdStyle}> {earring.name} </td>
                            <td  style={theme.TdStyle}> {earring.requestDescription} </td>
                            <td> <img src={`/ITABackEnd/storage/app/${earring.evidence1}`} alt="evidence1" width={100} height={100} /> </td>
                            <td> <img src={`/ITABackEnd/storage/app/${earring.evidence2}`} alt="evidence2" width={100} height={100} /> </td>
                            <td> <img src={`/ITABackEnd/storage/app/${earring.evidence3}`} alt="evidence3" width={100} height={100} /> </td>
                            <td  style={theme.TdStyle}> {earring.status} </td>
                            <td>
                                {/*<button
                                    onClick={() => deleteEarring(earring.id)}
                                    className="btn btn-danger"
                                >
                                    Eliminar
                                </button>*/}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default Earring;