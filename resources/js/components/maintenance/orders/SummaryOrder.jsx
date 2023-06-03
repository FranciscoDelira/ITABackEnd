import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import swal from "sweetalert";

function SummaryOrder() {

    //DATOS DEL SOLICITANTE

    const [nameApplicant, setNameApplicant] = useState('');
    const [lastnameApplicant, setLastNameApplicant] = useState('');
    const [areaApplicant, setAreaApplicant] = useState('');
    const [roleApplicant, setRoleApplicant] = useState('');

    //DATOS DE LA SOLICITUD DE MANTENIMIENTO

    const [IDMaintenance, setIDMaintenance] = useState(0);
    const [requestDate, setRequestDate] = useState('');
    const [department, setDepartment] = useState('');
    const [requestDescription, setRequestDescription] = useState('');
    const [evidence1, setEvidence1] = useState('');
    const [evidence2, setEvidence2] = useState('');
    const [evidence3, setEvidence3] = useState('');

    //DATOS DE LA ORDEN DE TRABAJO

    const [IDOrder, setIDOrder] = useState('');
    const [maintenanceDate, setMaintenanceDate] = useState('');
    const [maintenanceType, setMaintenanceType] = useState('Interno');
    const [serviceType, setServiceType] = useState('');
    const [releasedDate, setReleasedDate] = useState('');
    const [dateApproved, setDateApproved] = useState('');
    const [approversName, setApproversName] = useState('');

    //DATOS DEL EMPLEADO

    const [nameEmployee, setNameEmployee] = useState('');
    const [lastnameEmployee, setLastNameEmployee] = useState('');
    const [areaEmployee, setAreaEmployee] = useState('');
    const [roleEmployee, setRoleEmployee] = useState('');

    //DATOS TRABAJO TERMINADO

    const [jobDescription, setJobDescription] = useState('');
    const [evidence1Job, setEvidence1Job] = useState('');
    const [evidence2Job, setEvidence2Job] = useState('');
    const [evidence3Job, setEvidence3Job] = useState('');


    const { id } = useParams();

    const getData = async () => {
        const response = await axios.get(`/ITABackEnd/public/api/workorder_show/${id}`, //Obtener datos de la orden 
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-info')}`
                }
            })
        const response2 = await axios.get('/ITABackEnd/public/api/personalData_show/' + response.data.personaldata_id, //Obtener datos personales
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-info')}`
                }
            })

        const response3 = await axios.get('/ITABackEnd/public/api/user_show/' + response2.data.id, //Obtener datos del usuario
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-info')}`
                }
            })

        const response4 = await axios.get('/ITABackEnd/public/api/maintenance_show/' + response.data.maintenancerequest_id,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-info')}`
                }
            })

        const response5 = await axios.get('/ITABackEnd/public/api/personalData_show/' + response4.data.personaldata_id, //Obtener datos de personas de mantenimiento
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-info')}`
                }
            })

        const response6 = await axios.get('/ITABackEnd/public/api/user_show/' + response5.data.id, //Obtener datos de personas de mantenimiento
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-info')}`
                }
            })

        console.log(response, response2, response3, response4, response5, response6)

        setNameApplicant(response5.data.name)
        setLastNameApplicant(response5.data.lastname)
        setAreaApplicant(response5.data.area)
        setRoleApplicant(response6.data.role)

        setIDMaintenance(response.data.maintenancerequest_id)
        setRequestDate(response4.data.requestDate)
        setDepartment(response4.data.department)
        setRequestDescription(response4.data.requestDescription)
        setEvidence1(response4.data.evidence1)
        setEvidence2(response4.data.evidence2)
        setEvidence3(response4.data.evidence3)

        setIDOrder(response.data.id)
        setMaintenanceDate(response.data.maintenanceDate)
        setMaintenanceType(response.data.maintenanceType)
        setServiceType(response.data.serviceType)
        setReleasedDate(response.data.releasedDate)
        setDateApproved(response.data.dateApproved)
        setApproversName(response.data.approversName)

        setNameEmployee(response2.data.name)
        setLastNameEmployee(response2.data.lastname)
        setAreaEmployee(response2.data.area)
        setRoleEmployee(response3.data.role)

        setJobDescription(response.data.jobDescription)
        setEvidence1Job(response.data.evidence1)
        setEvidence2Job(response.data.evidence2)
        setEvidence3Job(response.data.evidence3)

    }

    useEffect(() => {
        getData()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost/ITABackEnd/public/api/workorder_newOrder', { //Para guardar los datos de la nueva orden
            maintenancerequest_id: ID, personaldata_id: employeeID,
            maintenanceType: maintenanceType, serviceType: serviceType, maintenanceDate: maintenanceDate
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
                console.log(employeeID);
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
            <Container style={{ paddingTop: '3%' }}>

                <Container fluid className="col-md-12 mx-auto" style={{ position: 'sticky', borderColor: "#1B396A", borderWidth: 3 }}>

                    <br />
                    <Form className='text-center form-control-lg' onSubmit={handleSubmit}>

                        <Form.Label className='mb-3' style={{ fontWeight: 'bold' }}>Resumen de la orden</Form.Label>

                        <Row className="mb-3">
                            <Form.Label style={{ fontWeight: 'bold' }}>Datos del solicitante</Form.Label>
                        </Row>

                        <Form.Group className='row mb-3' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Row className='mb-3'>
                                <Col sm>
                                    <label>Nombre</label>
                                </Col>
                                <Col sm>
                                    <Form.Control style={{ width: '100%' }} value={nameApplicant} placeholder='Nombre' type='text' disabled readOnly />
                                </Col>
                                <Col sm>
                                    <label >Apellidos</label>
                                </Col>
                                <Col sm>
                                    <Form.Control style={{ width: '100%' }} value={lastnameApplicant} placeholder='Apellidos' type='text' disabled readOnly />
                                </Col>
                            </Row>

                            <Row className='mb-3'>
                                <Col sm>
                                    <label>Área</label>
                                </Col>
                                <Col sm>
                                    <Form.Control style={{ width: '100%' }} value={areaApplicant} placeholder='Área' type='text' disabled readOnly />
                                </Col>
                                <Col sm>
                                    <label >Rol</label>
                                </Col>
                                <Col sm>
                                    <Form.Control style={{ width: '100%' }} value={roleApplicant} placeholder='Rol' type='text' disabled readOnly />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Label style={{ fontWeight: 'bold' }}>Datos de la solicitud de mantenimiento</Form.Label>
                        </Row>

                        <Form.Group className='row mb-3' style={{ display: "flex", flexlDirection: "", justifyContent: "center", alignItems: "center" }}>

                            <Row className='mb-3'>
                                <Col sm>
                                    <label>ID</label>
                                </Col>
                                <Col sm>
                                    <Form.Control style={{ width: '100%' }} value={IDMaintenance} type='text' placeholder='ID Solicitud' disabled />
                                </Col>
                                <Col sm>
                                    <label >Fecha</label>
                                </Col>
                                <Col sm>
                                    <Form.Control style={{ width: '100%' }} value={requestDate} type="text" name="dob" placeholder='Fecha solicitud' disabled />
                                </Col>
                            </Row>

                            <Row className='mb-3'>
                                <Col sm>
                                    <label >Departamento</label>
                                </Col>
                                <Col sm>
                                    <Form.Control style={{ width: '100%' }} value={department} placeholder='Departamento' type='text' disabled readOnly />
                                </Col>
                                <Col sm>
                                    <label >Estatus</label>
                                </Col>
                                <Col sm>
                                    <Form.Control style={{ width: '100%' }} value={'Aprobada'} placeholder='Estatus' type='text' disabled readOnly />
                                </Col>
                            </Row>

                            <Row className='mb-4'>
                                <Col sm>
                                    <label>Descripción de la solicitud</label>
                                    <Form.Control rows={3} style={{ width: '100%' }} value={requestDescription} placeholder='Descripción de la solicitud' as='textarea' disabled readOnly />
                                </Col>
                            </Row>

                            <Row className='mb-2'>
                                <Col sm>
                                    <Row className='mb-4'>
                                        <label>Evidencia 1</label>
                                    </Row>
                                    <Row className='mb-4'>
                                        <img src={`/ITABackEnd/storage/app/${evidence1}`} alt="evidence1" width={100} height={250} />
                                    </Row>
                                </Col>

                                <Col sm>
                                    <Row className='mb-4'>
                                        <label>Evidencia 2</label>
                                    </Row>
                                    <Row className='mb-4'>
                                        <img src={`/ITABackEnd/storage/app/${evidence2}`} alt="evidence2" width={100} height={250} />
                                    </Row>
                                </Col>

                                <Col sm>
                                    <Row className='mb-4'>
                                        <label>Evidencia 3</label>
                                    </Row>
                                    <Row className='mb-4'>
                                        <img src={`/ITABackEnd/storage/app/${evidence3}`} alt="evidence3" width={100} height={250} />
                                    </Row>
                                </Col>
                            </Row>

                        </Form.Group>



                        <Row className="mb-3">
                            <Form.Label style={{ fontWeight: 'bold' }}>Datos de la orden de trabajo</Form.Label>
                        </Row>

                        <Form.Group className='row mb-3' style={{ display: "flex", flexlDirection: "", justifyContent: "center", alignItems: "center" }}>

                            <Row className='mb-3'>
                                <Col sm>
                                    <label>ID</label>
                                </Col>
                                <Col sm>
                                    <Form.Control style={{ width: '100%' }} value={IDOrder} type='text' placeholder='ID Orden' disabled />
                                </Col>
                                <Col sm>
                                    <label >Fecha mantenimiento</label>
                                </Col>
                                <Col sm>
                                    <Form.Control style={{ width: '100%' }} value={maintenanceDate} type="text" name="dob" placeholder='Fecha mantenimiento' disabled />
                                </Col>
                            </Row>

                            <Row className='mb-4'>
                                <Col sm>
                                    <label >Tipo de mantenimiento</label>
                                </Col>
                                <Col sm>
                                    <Form.Control style={{ width: '100%' }} value={maintenanceType} placeholder='Tipo de mantenimiento' type='text' disabled readOnly />
                                </Col>
                                <Col sm>
                                    <label >Tipo de servicio</label>
                                </Col>
                                <Col sm>
                                    <Form.Control style={{ width: '100%' }} value={serviceType} placeholder='Tipo de servicio' type='text' disabled readOnly />
                                </Col>
                            </Row>

                            <Row className='mb-4'>
                                <Col sm>
                                    <label >Fecha de liberación</label>
                                </Col>
                                <Col sm>
                                    <Form.Control style={{ width: '100%' }} value={releasedDate} placeholder='Fecha de liberación' type='text' disabled readOnly />
                                </Col>
                                <Col sm>
                                    <label >Fecha de aprobación</label>
                                </Col>
                                <Col sm>
                                    <Form.Control style={{ width: '100%' }} value={dateApproved} placeholder='Fecha de aprobación' type='text' disabled readOnly />
                                </Col>
                            </Row>

                            <Row className='mb-4'>
                                <Col sm>
                                    <label >Aprobado por</label>
                                </Col>
                                <Col sm>
                                    <Form.Control style={{ width: '50%' }} value={approversName} placeholder='Nombre del aprobador ' type='text' disabled readOnly />
                                </Col>
                            </Row>


                            <Row className="mb-3">
                                <Form.Label style={{ fontWeight: 'bold' }}>Datos del empleado</Form.Label>
                            </Row>

                            <Row className='mb-3'>
                                <Col sm>
                                    <label>Nombre</label>
                                </Col>
                                <Col sm>
                                    <Form.Control style={{ width: '100%' }} value={nameEmployee} placeholder='Nombre' type='text' disabled readOnly />
                                </Col>
                                <Col sm>
                                    <label >Apellidos</label>
                                </Col>
                                <Col sm>
                                    <Form.Control style={{ width: '100%' }} value={lastnameEmployee} placeholder='Apellidos' type='text' disabled readOnly />
                                </Col>
                            </Row>

                            <Row className='mb-3'>
                                <Col sm>
                                    <label>Área</label>
                                </Col>
                                <Col sm>
                                    <Form.Control style={{ width: '100%' }} value={areaEmployee} placeholder='Área' type='text' disabled readOnly />
                                </Col>
                                <Col sm>
                                    <label >Rol</label>
                                </Col>
                                <Col sm>
                                    <Form.Control style={{ width: '100%' }} value={roleEmployee} placeholder='Rol' type='text' disabled readOnly />
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Form.Label style={{ fontWeight: 'bold' }}>Datos del trabajo terminado</Form.Label>
                            </Row>

                            <Row className='mb-4'>
                                <Col sm>
                                    <label>Descripción de la solicitud</label>
                                    <Form.Control rows={3} style={{ width: '100%' }} value={jobDescription} placeholder='Descripción de la solicitud' as='textarea' disabled readOnly />
                                </Col>
                            </Row>

                            <Row className='mb-2'>
                                <Col sm>
                                    <Row className='mb-4'>
                                        <label>Evidencia 1</label>
                                    </Row>
                                    <Row className='mb-4'>
                                        <img src={`/ITABackEnd/storage/app/${evidence1Job}`} alt="evidence1" width={100} height={250} />
                                    </Row>
                                </Col>

                                <Col sm>
                                    <Row className='mb-4'>
                                        <label>Evidencia 2</label>
                                    </Row>
                                    <Row className='mb-4'>
                                        <img src={`/ITABackEnd/storage/app/${evidence2Job}`} alt="evidence2" width={100} height={250} />
                                    </Row>
                                </Col>

                                <Col sm>
                                    <Row className='mb-4'>
                                        <label>Evidencia 3</label>
                                    </Row>
                                    <Row className='mb-4'>
                                        <img src={`/ITABackEnd/storage/app/${evidence3Job}`} alt="evidence3" width={100} height={250} />
                                    </Row>
                                </Col>
                            </Row>

                        </Form.Group>

                        <Form.Group className="row">
                            <Col>
                                <Button style={{ backgroundColor: '#1B396A', color: 'white', fontFamily: 'Montserrat', margin: '10%', height: 40, width: 100 }} as={Link} to={'http://localhost/ITABackEnd/public/approved'} >
                                    Regresar
                                </Button>
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
export default SummaryOrder;