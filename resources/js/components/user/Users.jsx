import React from 'react';
import Table from 'react-bootstrap/Table';

import IconUser from '/src/IconsUser/IconUser.png';
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

import axios from "axios";

const ruta = "http://localhost/ITABackEnd/api";

const Approved = () => {

    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const ruta = "http://localhost/ITABackEnd/public/api";

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        const response = await axios.get('http://localhost/ITABackEnd/public/api/user_showUsers',
        { //acceder con el token
            headers: {
              'Content-Type': 'multipart/form-data',
              'Accept': 'application/json',
              'Authorization':`Bearer ${localStorage.getItem('user-info')}`
            }
          });
        setUsers(response.data);
        console.log(response.data);
    };

    const deleteUsers = async (id) => {
        await axios.delete(`${ruta}/workorder_destroy/${id}`, {});
        getAllUsers();
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
                            <Col md>
                                <Nav.Link>
                                    <img className='col-mb-3 mx-auto' src={IconUser} width={280} height={90} />
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
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Área</th>
                        <th>Plantel</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td> {user.id} </td>
                            <td> {user.name} </td>
                            <td> {user.lastname} </td>
                            <td> {user.area} </td>
                            <td> {user.plantel} </td>
                            <td> {user.email} </td>
                            <td> {user.role} </td>
                            <td>
                                <Stack direction='horizontal'>
                                    <Button style={{ backgroundColor: '#1B396A', color: 'white', fontFamily: 'Montserrat', margin: '10%', height: 40, width: 100 }} as={Link} to={`http://localhost/ITABackEnd/public/editUser/${user.id}`} >
                                        Editar
                                    </Button>
                                    <Button style={{ backgroundColor: 'white', color: '#1B396A', fontFamily: 'Montserrat', height: 40, width: 90 }}
                                        onClick={() => deleteApproveds(user.id)}
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