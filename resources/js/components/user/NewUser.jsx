import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Footer from '../Footer';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { auto, left } from '@popperjs/core';

const theme = {
  bg: {
    backgroundColor: 'white',
  },
  logo: {
    width: 450,
    height: auto
  },
  header: {
    color: 'black',
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
  },modalBg:{
    backgroundColor: '#807E82',
    fontFamily: 'Montserrat',
    fontSize: '20px',
    color: 'white',
    textAlign: "center",
  },input:{
    color: 'white',
    fontSize: '20px',
    backgroundColor: '#1B396A',
  }
};

const card = {
  backgroundColor: "yellow"
};

function NewUser() {
  const [validated, setValidated] = useState(false);
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const [input, setInput] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email:'',
    confirmEmail:''
    
  });
 
  const [error, setError] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email:'',
    confirmEmail:''
  })
 
  const onInputChange = e => {
    const { name, value } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: value
    }));
    validateInput(e);
  }
 
  const validateInput = e => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj = { ...prev, [name]: "" };
 
      switch (name) {
        case "username":
          if (!value) {
            stateObj[name] = "Please enter Username.";
          }
          break;
 
        case "password":
          if (!value) {
            stateObj[name] = "Porfavor ingrese la contraseña.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] = "Error, Las contraseñas no coinciden.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
          }
          break;
 
        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Por favor confirme la contraseña.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Error, Las contraseñas no coinciden.";
          }
          break;

          case "email":
          if (!value) {
            stateObj[name] = "Porfavor ingrese el correo.";
          } else if (input.confirmEmail && value !== input.confirmEmail) {
            stateObj["confirmEmail"] = "Error, Los correos no coinciden.";
          } else {
            stateObj["confirmEmail"] = input.confirmEmail ? "" : error.confirmEmail;
          }
          break;
 
        case "confirmEmail":
          if (!value) {
            stateObj[name] = "Porfavor ingrese el correo.";
          } else if (input.email && value !== input.email) {
            stateObj[name] = "Error, Los correos no coinciden.";
          }
          break;
 
        default:
          break;
      }
 
      return stateObj;
    });
  }

  return (
    <>
    <section>
    <Container fluid style={{ padding: 40, position: 'sticky', alignItems: 'center' }}>
      <Stack  align="center" className="col-md-6 mx-auto" style={{ borderColor: "#1B396A", borderWidth: 3 }}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <h1 style={theme.header}>Registro de nuevo usuario</h1>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Control
              required
              type="text"
              placeholder="Nombre"
              style={theme.fControl}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Control
              required
              type="text"
              placeholder="Apellidos"
              style={theme.fControl}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Control
              required
              type="text"
              placeholder="Area"
              style={theme.fControl}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Control
              required
              type="text"
              placeholder="Plantel"
              style={theme.fControl}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Control
              required
              type="email"
              name="email"
              placeholder="Correo"
              onBlur={validateInput}
              onChange={onInputChange}
              style={theme.fControl}
            />
            {error.email && <span className='err'>{error.email}</span>}
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Control
              required
              type="email"
              name="confirmEmail"
              placeholder="Confirmacion"
              onBlur={validateInput}
              onChange={onInputChange}
              style={theme.fControl}
            />
            {error.confirmEmail && <span className='err'>{error.confirmEmail}</span>}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Control
              required
              type="password"
              name="password"
              placeholder='Enter Password'
              value={input.password}
              onChange={onInputChange}
              onBlur={validateInput}
              style={theme.fControl}
            />
            {error.password && <span className='err'>{error.password}</span>}
            
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirmación"
              value={input.confirmPassword}
              onChange={onInputChange}
              onBlur={validateInput}
              style={theme.fControl}
            />{error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
          </Form.Group>
        </Row>
        <Row className="m-2">
        <Stack>
            <h1 style={theme.fHText}>Firma</h1>
          </Stack>
          <Stack direction="horizontal"gap={2} className="col-md-6 mx-auto">
            <input id='fileUpload' type='file' style={theme.input} multiple accept='application/pdf, image/png' responsive/>
          </Stack>
        </Row>
        <Stack direction="horizontal"gap={2} className="col-md-9 mx-auto">
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
          <Button style={theme.button} onClick={handleShow}>Enviar</Button>
            <Modal show={show} onHide={handleClose}>
            <Modal.Body style={theme.modalBg}> ¿Estas seguro de enviar la informacion?</Modal.Body>
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
            <Modal.Body style={theme.modalBg}>
              Registro Completado 
              <br/>
              La información ha sido enviada correctamente
              </Modal.Body>
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
      </Form>
      <br/>
      </Stack>
      
      </Container>
    </section>
    </>
  );
}

export default NewUser;