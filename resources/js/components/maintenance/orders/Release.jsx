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

const Release = () => {

    const [releases, setReleases] = useState([]);

    useEffect(() => {
        getAllReleases();
    }, [])

    const getAllReleases = async () => {
        const response = await axios.get('http://localhost/ITAFrontEndWeb/public/api/maintenance_showRelease');
        setReleases(response.data);
        console.log(response.data);
    }

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
                        <th>Tipo de mantenimiento</th>
                        <th>Tipo de servicio</th>
                        <th>Nombre del empleado</th>
                        <th>Fecha de mantenimiento</th>
                        <th>Descripción del trabajo</th>
                        <th>Evidencia 1</th>
                        <th>Evidencia 2</th>
                        <th>Evidencia 3</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {releases.map((release) => (
                        <tr key={release.id}>
                            <td> {release.id} </td>
                            <td> {release.maintenanceType} </td>
                            <td> {release.serviceType} </td>
                            <td> {release.employeeName} </td>
                            <td> {release.maintenanceDate} </td>
                            <td> {release.jobDescription} </td>
                            <td> {release.evidence1} </td>
                            <td> {release.evidence2} </td>
                            <td> {release.evidence3} </td>
                            <td> {release.status} </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default Release;