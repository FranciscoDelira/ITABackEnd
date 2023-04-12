import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TNM3A from '/src/Imagenes/TNM3A.png';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'

import React, { useState } from 'react';
import axios from 'axios';


const theme = {
  bg: {
    backgroundColor: 'white',
  },
  logo: {
    alignContent: "center",
    weith: 150,
    height: 150
  },
  header: {
    color: 'black',
    fontSize: '96px',
    fontFamily: 'Montserrat'
  },
  fControl: {
    backgroundColor: "#ECECEC",
    borderColor: "black",
    fontFamily: 'Montserrat',
    fontSize: '20px',
    width: '17%',
    borderRadius: 50
  },
  fHText: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: '20px'
  },
  button: {
    color: 'black',
    fontSize: '20px',
    backgroundColor: '#FFFFFF',
    borderRadius: 30
  }
};

const card = {
  backgroundColor: "blue"
};

function Login() {

  const [formValue, setformValue] = useState({
    email: '',
    password: ''
  })

  const onChange = (e) => {
    e.persist();
    setformValue({ ...formValue, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    if (e && e.preventDefault()) e.preventDefault();
    const formData = new FormData();
    formData.append("email", formValue.email)
    formData.append("password", formValue.password)
    axios.post("http://localhost/laravel/topicos/public/api/login",
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      }
    ).then(response => {
      console.log('response:');
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  };

  return (

    <div style={theme.bg} expant='xxl' position="absolute">

      <Container align="center">

        <img className='mb-3' src={TNM3A} style={theme.logo} />

        <Form onSubmit={handleSubmit}>
          <Form.Label className='mb-3' style={theme.header} >Bienvenido</Form.Label>

          <Card bg={'primary'} size={70} >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Correo institucional" name="email"
                  value={formValue.email} onChange={onChange} style={theme.fControl} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Contraseña" name="password"
                  value={formValue.password} onChange={onChange} style={theme.fControl} />
              </Form.Group>
          </Card>

          <Button variant="primary" type="submit" style={theme.button}>
            Iniciar sesión
          </Button>

          <Form.Group className='mb-3'>
            <Form.Text style={theme.fHText}>
              ¿Has olvidado tu contraseña?
            </Form.Text>
          </Form.Group>

        </Form>
      </Container>

    </div>
  );
}

export default Login;