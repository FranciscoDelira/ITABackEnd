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
import { Button } from 'react-bootstrap';

const theme = {
    ThStyle: {
        fontFamily: 'Montserrat'
    },
    TdStyle: {
        fontFamily: 'Montserrat'
    }
}

const Release = () => {

    const [releases, setReleases] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const setSearchTermse = (data) => {
        let status = '';
        let show = document.getElementsByClassName('release')
        for (let index = 0; index < show.length; index++) {

            status = show[index].children[9].textContent.toLowerCase();
            if (status.includes(data.toLowerCase())) {
                show[index].removeAttribute('hidden')
            } else {
                show[index].setAttribute('hidden', 'True')
            }

        }
    }

    useEffect(() => {
        getAllReleases();
    }, [])

    const getAllReleases = async () => {
        const response = await axios.get('http://localhost/ITABackEnd/public/api/workorder_showRelease',
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-info')}`
                }
            });
        setReleases(response.data);
        console.log(response.data);
    }

    const deleteRelease = async (id) => {
        await axios.delete(`http://localhost/ITABackEnd/public/api/workorder_destroy/${id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-info')}`
                }
            });
        getAllReleases();
    }

    const handleClick = (id) => {
        const confirmar = window.confirm(`¿Deseas aprobar la orden de solicitud con el ID: ${id}?`);
        if (confirmar) {
            window.location.href = `http://localhost/ITABackEnd/public/approveOrder/${id}`;
        }
    };

    const filteredReleases = releases.filter((release) => {

        if (searchTerm === "") {
            return release;
        } else if (
            release.maintenanceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            release.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            release.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            release.jobDescription.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return release;
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
                        <th style={theme.ThStyle}>Tipo de mantenimiento</th>
                        <th style={theme.ThStyle}>Tipo de servicio</th>
                        <th style={theme.ThStyle}>Nombre del empleado</th>
                        <th style={theme.ThStyle}>Fecha de mantenimiento</th>
                        <th style={theme.ThStyle}>Descripción del trabajo</th>
                        <th style={theme.ThStyle}>Evidencia 1</th>
                        <th style={theme.ThStyle}>Evidencia 2</th>
                        <th style={theme.ThStyle}>Evidencia 3</th>
                        <th style={theme.ThStyle}>Estado</th>
                        <th style={theme.ThStyle}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReleases.map((release) => (
                        <tr key={release.id} className='release'>
                            <td style={theme.TdStyle} onClick={() => handleClick(release.id)}> {release.id} </td>
                            <td style={theme.TdStyle} onClick={() => handleClick(release.id)}> {release.maintenanceType} </td>
                            <td style={theme.TdStyle} onClick={() => handleClick(release.id)}> {release.serviceType} </td>
                            <td style={theme.TdStyle} onClick={() => handleClick(release.id)}> {release.name} </td>
                            <td style={theme.TdStyle} onClick={() => handleClick(release.id)}> {release.maintenanceDate} </td>
                            <td style={theme.TdStyle} onClick={() => handleClick(release.id)}> {release.jobDescription} </td>
                            <td> <img src={`/ITABackEnd/storage/app/${release.evidence1}`} onClick={() => handleClick(release.id)} alt="evidence1" width={100} height={100} /> </td>
                            <td> <img src={`/ITABackEnd/storage/app/${release.evidence2}`} onClick={() => handleClick(release.id)} alt="evidence2" width={100} height={100} /> </td>
                            <td> <img src={`/ITABackEnd/storage/app/${release.evidence3}`} onClick={() => handleClick(release.id)} alt="evidence3" width={100} height={100} /> </td>
                            <td style={theme.TdStyle} onClick={() => handleClick(release.id)}> {release.status} </td>
                            <td>
                                <Button onClick={() => deleteRelease(release.id)} style={{ backgroundColor: 'white', color: '#1B396A', fontFamily: 'Montserrat' }}
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default Release;