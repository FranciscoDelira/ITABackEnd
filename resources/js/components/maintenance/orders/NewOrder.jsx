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

function NewOrder() {

  const [employeeName, setEmployeeName] = useState('');
  const [maintenanceType, setMaintenanceType] = useState('Interno');
  const [serviceType, setServiceType] = useState('');
  const [maintenanceDate, setMaintenanceDate] = useState('');

  const [name, setName] = useState('');
  const [signature, setSignature] = useState('');
  const [department, setDepartment] = useState('');
  const [requestDescription, setRequestDescription] = useState('');
  const [status, setStatus] = useState('');
  const [ID, setID] = useState(0);


  const { id } = useParams();

  const getData = async () => {
    const response = await axios.get(`/ITABackEnd/public/api/maintenance_show/${id}`,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('user-info')}`
        }
      })
    const response2 = await axios.get('/ITABackEnd/public/api/personalData_show/' + response.data.personaldata_id,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('user-info')}`
        }
      })

    console.log(response, response2)
    setID(response.data.id)
    setName(response2.data.name)
    setDepartment(response.data.department)
    setSignature(response2.data.signature)
    setRequestDescription(response.data.requestDescription)
    setStatus(response.data.status)
  }

  useEffect(() => {
    getData()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost/ITABackEnd/public/api/workorder_newOrder', {
      maintenancerequest_id: ID, employeeName: employeeName,
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
      <section>
        <br />
        <Container>
          <Stack>

            <Stack align="center" gap={3}>
              <div><img className='mb-3' src={IconReleasedUser} style={theme.optionIcons} /></div>
            </Stack>
          </Stack>

        </Container>
      </section>


      <Container fluid className="col-md-9 mx-auto" style={{ position: 'sticky', borderColor: "#1B396A", borderWidth: 3 }}>

        <br />
        <Form className='text-center form-control-lg' onSubmit={handleSubmit}>

          <Form.Label className='mb-3' style={{ fontWeight: 'bold' }}>Datos para la orden de trabajo</Form.Label>

          <Form.Group className='row mb-3'>
            <Form.Label className='col-4'>Nombre del empleado</Form.Label>
            <Col>
              <Form.Control className='col-8' onChange={(e) => setEmployeeName(e.target.value)} />
            </Col>
          </Form.Group>

          <Form.Group className='row mb-3'>
            <Form.Label className='col-4'>Tipo de mantenimiento</Form.Label>
            <Col>
              <Form.Control className='col-8' value={"Interno"} type='text' placeholder='Rol' disabled readOnly />
            </Col>

            <Form.Label className='col'>Tipo de servicio</Form.Label>
            <Col>
              <Form.Select className='col-8 mb-3' type='text' placeholder='Rol' onChange={(e) => setServiceType(e.target.value)} >
                <option>Servicio</option>
                <option value={'Eléctrico'}>Eléctrico</option>
                <option value={'Plomería'}>Plomería</option>
                <option value={'Herrería'}>Herrería</option>
                <option value={'Pintura'}>Pintura</option>
                <option value={'Obra Civil'}>Obra Civil</option>
                <option value={'Otro'}>Otro</option>
              </Form.Select>
            </Col>
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
                <Form.Control style={{ width: '100%' }} value={ID} type='text' placeholder='ID' />
              </Col>
              <Col sm>
                <label >Fecha de mantenimiento</label>
              </Col>
              <Col sm>
                <Form.Control style={{ width: '85%' }} type="date" name="dob" onChange={(e) => setMaintenanceDate(e.target.value)} />
              </Col>
            </Row>

            <Row className='mb-3'>
              <Col sm>
                <label>Solicitante</label>
              </Col>
              <Col sm>
                <Form.Control style={{ width: '100%' }} value={name} type='text' disabled readOnly />
              </Col>
              <Col sm>
                <label >Departamento</label>
              </Col>
              <Col sm>
                <Form.Control style={{ width: '85%' }} value={department} type='text' disabled readOnly />
              </Col>
            </Row>

            <Row className='mb-4'>
              <Col sm>
                <label>Descripción de la solicitud</label>
                <Form.Control rows={3} style={{ width: '100%' }} value={requestDescription} as='textarea' disabled readOnly />
              </Col>
            </Row>

            <Row className='mb-5'>
              <Col sm>
                <label>Firma del solicitante</label>
              </Col>
              <Col sm>
                <img src={signature} alt="signature" width={100} height={100} />
              </Col>
              <Col sm>
                <label >Estatus</label>
              </Col>
              <Col sm>
                <Form.Control style={{ width: '85%' }} value={status} type='text' disabled readOnly />
              </Col>
            </Row>

            <Form.Group className="row">
              <Col>
                <Link className="btn btn-danger" to={'http://localhost/ITABackEnd/public/activeRequest'}>Regresar</Link>
              </Col>
              <Col>
                <Button type="submit" className="btn btn-submit">Aceptar</Button>
              </Col>
            </Form.Group>

          </Form.Group>

        </Form>
        <br />
      </Container>
      <br />
    </>
  );
}
export default NewOrder;