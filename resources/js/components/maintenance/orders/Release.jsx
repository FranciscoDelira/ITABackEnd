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
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getAllReleases();
    }, [])

    const getAllReleases = async () => {
        const response = await axios.get('http://localhost/ITAFrontEndWeb/public/api/workoder_showRelease');
        setReleases(response.data);
        console.log(response.data);
    }

    const filteredReleases = releases.filter((release) => {
        if (searchTerm === "") {
            return release;
        } else if (
            release.maintenanceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            release.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            release.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            release.jobDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
            release.status.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReleases.map((release) => (
                        <tr key={release.id}>
                            <td> {release.id} </td>
                            <td> {release.maintenanceType} </td>
                            <td> {release.serviceType} </td>
                            <td> {release.employeeName} </td>
                            <td> {release.maintenanceDate} </td>
                            <td> {release.jobDescription} </td>
                            <td> <img src={release.evidence1} alt="signature" width={100} height={100} /> </td>
                            <td> <img src={release.evidence2} alt="signature" width={100} height={100} /> </td>
                            <td> <img src={release.evidence3} alt="signature" width={100} height={100} /> </td>
                            <td> {release.status} </td>
                            <td> <Link
                                to={`${active.id}`}
                                className="btn btn-warning"
                            >
                                Aprobar
                            </Link>
                                <button
                                    onClick={() => deleteApproveds(active.id)}
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

export default Release;