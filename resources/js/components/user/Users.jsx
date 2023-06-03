import React from 'react';
import Table from 'react-bootstrap/Table';

import IconUser from '/src/IconsUser/IconUser.png';
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
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
    const handleDelete = (id) => {

        // Mostrar alerta antes de eliminar

        if (window.confirm('¿Estás seguro de que deseas eliminar este elemento?')) {

            deleteUsers(id);

        }

    };

    const handleClick = (id) => {
        window.location.href = `http://localhost/ITABackEnd/public/editUser/${id}`;
    };

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
                        <th style={theme.ThStyle}>ID</th>
                        <th style={theme.ThStyle}>Nombre</th>
                        <th style={theme.ThStyle}>Apellidos</th>
                        <th style={theme.ThStyle}>Área</th>
                        <th style={theme.ThStyle}>Plantel</th>
                        <th style={theme.ThStyle}>Email</th>
                        <th style={theme.ThStyle}>Rol</th>
                        <th style={theme.ThStyle}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td style={theme.ThStyle} onClick={() => handleClick(user.id)}> {user.id} </td>
                            <td style={theme.ThStyle} onClick={() => handleClick(user.id)}> {user.name} </td>
                            <td style={theme.ThStyle} onClick={() => handleClick(user.id)}> {user.lastname} </td>
                            <td style={theme.ThStyle}> {user.area} </td>
                            <td style={theme.ThStyle}> {user.plantel} </td>
                            <td style={theme.ThStyle}> {user.email} </td>
                            <td style={theme.ThStyle}> {user.role} </td>
                            <td>
                                <Stack direction='horizontal'>
                                    <Button style={{ backgroundColor: 'white', color: '#1B396A', fontFamily: 'Montserrat', height: 40, width: 90 }}
                                        onClick={() => handleDelete(user.id)}
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