import { Nav } from 'react-bootstrap';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import IconReleasedUser from '/src/IconsOrders/CreateNewOrder.png';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { auto, left } from '@popperjs/core';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Badge from 'react-bootstrap/Badge';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import swal from "sweetalert";

const theme = {
    bg: {
        backgroundColor: 'white',
    },
    logo: {
        width: 450,
        height: auto
    },
    header: {
        color: 'White',
        fontSize: '50px',
        fontFamily: 'Montserrat',
        textAlign: 'center'
    },
    fControl: {
        backgroundColor: "white",
        borderColor: "#807E82",
        fontFamily: 'Montserrat',
        fontSize: '20px',
        color: "#807E82",
        width: 'auto',
        borderRadius: 10,
        textAlign: "left"
    },
    fControl2: {
        backgroundColor: "white",
        borderColor: "#807E82",
        fontFamily: 'Montserrat',
        fontSize: '20px',
        color: "#807E82",
        width: '450px',
        borderRadius: 10,
        textAlign: "left"
    }, fControlDate: {
        backgroundColor: "white",
        borderColor: "#807E82",
        fontFamily: 'Montserrat',
        fontSize: '20px',
        color: "#807E82",
        width: '270px',
        borderRadius: 10,
        textAlign: "left"
    },
    fHText: {
        fontFamily: 'Montserrat',
        fontSize: '20px',
        color: 'black',
        textAlign: "center",
    },
    button: {
        color: 'white',
        fontSize: '20px',
        backgroundColor: '#1B396A',
        borderRadius: 15
    },
    button2: {
        color: '#EE7044',
        fontSize: '20px',
        backgroundColor: 'white',
        borderColor: "white",
        borderRadius: 15
    },
    optionIcons: {
        align: "center",
        width: 350,
        height: 100
    }, input: {
        color: 'white',
        fontSize: '20px',
        backgroundColor: '#1B396A',
    }, modalBg: {
        backgroundColor: '#807E82',
        fontFamily: 'Montserrat',
        fontSize: '20px',
        color: 'white',
        textAlign: "center",
    }
};

const card = {
    backgroundColor: "yellow"
};

function ApproveOrder() {

    const [approversName, setApproversName] = useState('');
    const [dateApproved, setDateApproved] = useState('');
    const [ID, setID] = useState(0);


    const { id } = useParams();

    const getData = async () => {
        const response = await axios.get('/ITABackEnd/public/api/user_show/' + localStorage.getItem('user-id'),
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-info')}`
                }
            })
        const response2 = await axios.get(`/ITABackEnd/public/api/personalData_show/${response.data.personaldata_id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-info')}`
                }
            })
        const response3 = await axios.get(`/ITABackEnd/public/api/workorder_show/${id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-info')}`
                }
            })

        console.log(response, response2)

        setApproversName(response2.data.name)
        setID(response3.data.id)
        //setDateApproved(response2.data.dateApproved)
    }


    useEffect(() => {
        getData()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost/ITABackEnd/public/api/workorder_approvedOrder', {
            id: ID, approversName: approversName,
            dateApproved: dateApproved, serviceType: serviceType, maintenanceDate: maintenanceDate
        }, {
            headers: {

                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user-info')}`
            }
        })
            .then((response) => {
                console.log(response);
                swal({
                    title: "Guardado",
                    text: "Añadido exitosamente",
                    icon: "success",
                    buttons: false,
                    timer: 2000
                }).then(() => {
                    window.location.href = 'http://localhost/ITABackEnd/public/activeRequest';
                });
            })
            .catch((error) => {
                console.log(error);
                swal({
                    titlle: "Error al enviar",
                    text: "Revisar la información que sea correcta",
                    icon: "error",
                    buttons: "Aceptar"
                })
            });
    }

    return (
        <>
            <Container style={{ paddingTop: 20 }}>
                <Container fluid className="col-md-9 mx-auto" style={{ position: 'sticky', borderColor: "#1B396A", borderWidth: 3 }}>

                    <br />
                    <Form className='text-center form-control-lg' onSubmit={handleSubmit}>

                        <Form.Label className='mb-3' style={{ fontWeight: 'bold' }}>Aprobar orden</Form.Label>

                        <Form.Group className='row mb-3'>
                            <Form.Label className='col-4'>Nombre del que aprueba</Form.Label>
                            <Col>
                                <Form.Control value={approversName} className='col-8' onChange={(e) => setApproversName(e.target.value)} disabled />
                            </Col>
                        </Form.Group>

                        <Form.Group className='row mb-3'>
                            <Form.Label className='col-4'>Fecha de aprobación</Form.Label>
                            <Col>
                                <Form.Control className='col-8' type="date" name="dob" onChange={(e) => setDateApproved(e.target.value)} />
                            </Col>
                        </Form.Group>

                    </Form>
                    <br />
                </Container>
                <br />
            </Container>
        </>
    );
}
export default ApproveOrder;