import { Nav } from 'react-bootstrap';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Menu from '../../Menu';
import Footer from '../../Footer';
import Stack from 'react-bootstrap/Stack';
import IconReleasedUser from '/src/IconsOrders/CreateNewOrder.png';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { auto, left } from '@popperjs/core';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';


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
  },fControlDate: {
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
    borderColor:"white",
    borderRadius: 15
  },
  optionIcons: {
    align: "center",
    width: 350,
    height: 100
  },input:{
    color: 'white',
    fontSize: '20px',
    backgroundColor: '#1B396A',
  },modalBg:{
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
  
function pruebas(){
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const postData = async () =>{
    const response = await axios.post('http://localhost/ITAFrontEndWeb/public/api/workorder_store');

    setMaintenanceType(response.data.maintenanceType)
    setServiceType(response.data.serviceType)
    setEmployeeName(response.data.employeeName)
    setJobDescription(response.data.jobDescription)
  }

  useEffect(()=>{
    postData()
  },[])


  return (
      <>
      <section>
        <br/>
        <Container>
        <Stack>
          <Stack align="center" gap={3}> 
              <div><img className='mb-3' src={IconReleasedUser} style={theme.optionIcons} /></div>
          </Stack>
        </Stack>
        </Container>
      </section>
      <section>
        <Stack  align="center" className="col-md-6 mx-auto" style={{ borderColor: "#1B396A", borderWidth: 3 }}>
        <br/>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Control
                required
                type="text"
                fontFamily='Montserrat'
                placeholder="Folio"
                style={theme.fControl}
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Control type="date" name="dob" placeholder="Fecha" style={theme.fControlDate}/>
            </Form.Group>
          </Row>
          <Row className="m-2">
            <Form.Group as={Col} controlId="validationCustom02">
              <Form.Control
                required
                type="text"
                placeholder='Trabajador'
                fontFamily='Montserrat'
                style={theme.fControl2}
              />
            </Form.Group>
          </Row>
          <Row className="m-2">
            <Form.Group as={Col} controlId="validationCustom02">
              <Form.Control
                required
                type="text"
                placeholder='Descripción'
                fontFamily='Montserrat'
                style={theme.fControl2}
              />
            </Form.Group>
          </Row>
          <Stack>
            <h1 style={theme.fHText}>Subir Evidencia</h1>
          </Stack>
          <Stack direction="horizontal"gap={2} className="col-md-6 mx-auto">
            <input id='fileUpload' type='file' style={theme.input} multiple accept='application/pdf, image/png' responsive/>
          </Stack>
          <Stack>
            <br/>
            <br/>
          <Stack direction="horizontal"gap={2} className="col-md-9 mx-auto">
          <div/>
          <div/>
          <div/>
          <div/>
          <div/>
          <div/>
            <Button style={theme.button} onClick={handleShow}>Enviar</Button>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton style={theme.modalBg}>
              <Modal.Title>Confirmar envio de información</Modal.Title>
            </Modal.Header>
            <Modal.Body style={theme.modalBg}>¿Estas seguro de enviar la informacion?</Modal.Body>
            <Modal.Footer style={theme.modalBg}>
            <Stack direction="horizontal"gap={2} className="col-md-5 mx-auto">
            <Button style={theme.button} onClick={handleShow2}>
              Enviar
            </Button>
            <Button style={theme.button2} onClick={handleClose}>
              Cancelar
            </Button>
            </Stack>
            <Modal show={show2}  onHide={handleClose2}>
            <Modal.Header style={theme.modalBg}>
              <Modal.Title style={theme.header}>Envio confirmado</Modal.Title>
            </Modal.Header>
            <Modal.Body style={theme.modalBg}>La información ha sido enviada correctamente</Modal.Body>
            <Modal.Footer style={theme.modalBg}>
            <Stack direction="horizontal"gap={2} className="col-md-3 mx-auto">
              <Button type="submit" style={theme.button} onClick={handleClose2}>
                Aceptar
              </Button>
            </Stack>
            </Modal.Footer>
            </Modal>
          </Modal.Footer>
      </Modal>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <Button type="submit" align="right" style={theme.button2}>Cancelar</Button>
          </Stack>
          </Stack>
        </Form>
        <br/>
        </Stack>
      </section>
      <br/>
      </>
    );
}
export default pruebas;