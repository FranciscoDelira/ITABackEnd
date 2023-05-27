import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TNM3A from '/src/Images/TNM3A.png';
import { Container } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';

import React, { useState } from 'react';
import axios from 'axios';
import { auto } from '@popperjs/core';
import { useNavigate } from 'react-router-dom';
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
    textAlign: "center"
  },
  fHText: {
    fontFamily: 'Montserrat',
    fontSize: '20px',
    color: 'black',
    textAlign: "center",
    textDecoration: "underline"
  },
  button: {
    color: 'white',
    fontSize: '20px',
    backgroundColor: '#1B396A',
    borderRadius: 15
  }
};

const card = {
  backgroundColor: "yellow"
};

function Login() {

  const [formValue, setformValue] = useState({
    email: '',
    password: ''
  })

  let navigate = useNavigate();

  const onChange = (e) => {
    e.persist();
    setformValue({ ...formValue, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    if (e && e.preventDefault()) e.preventDefault();
    const formData = new FormData();
    formData.append("email", formValue.email)
    formData.append("password", formValue.password)
    axios.post('http://localhost/ITABackEnd/public/api/login',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      }
    ).then(response => {

      localStorage.setItem("user-info", response.data[0])
      localStorage.setItem('user-id', response.data[1].id)

      navigate({pathname: "/ITABackEnd/public/home", state: {token: response.data[0]}})

      console.log('response:');
      console.log(response);    

    }).catch(error => {
      console.log(error);
      swal({
        title: "No Autorizado",
        text: "Error Al Iniciar Sesión",
        icon: "error",
        buttons: "Aceptar"
      });
    });
  };

  return (

    <Container fluid style={{ padding: 40, position: 'sticky', alignItems: 'center' }}>
      <Stack gap={2} className="col-md-5 mx-auto">
        <img className='mb-3 mx-auto' src={TNM3A} style={theme.logo} />
      </Stack>

      <Stack align="center" className="col-md-5 mx-auto" style={{ borderColor: "#1B396A", borderWidth: 3 }}>

        <Form onSubmit={handleSubmit} style={{ position: 'sticky' }}>

          <Form.Label className='mb-3' style={theme.header} >Departamento de mantenimiento</Form.Label>

          <Form.Group className="mb-3" controlId="formBasicEmail" >
            <Form.Control type="email" placeholder="Correo institucional" name="email"
              value={formValue.email} onChange={onChange} style={theme.fControl} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Contraseña" name="password"
              value={formValue.password} onChange={onChange} style={theme.fControl} />
          </Form.Group>

          <Button variant="primary" type="submit" style={theme.button}>
            Iniciar sesión
          </Button>

        </Form>

      </Stack>


    </Container>

  );
}

export default Login;