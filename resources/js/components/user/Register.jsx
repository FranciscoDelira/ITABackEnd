import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { auto } from '@popperjs/core';


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
    borderColor: "white",
    borderRadius: 15
  }, modalBg: {
    backgroundColor: '#807E82',
    fontFamily: 'Montserrat',
    fontSize: '20px',
    color: 'white',
    textAlign: "center",
  }, input: {
    color: 'white',
    fontSize: '20px',
    backgroundColor: '#1B396A',
  }
};

const card = {
  backgroundColor: "yellow"
};

function Register() {

  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [area, setArea] = useState('');
  const [plantel, setPlantel] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signature, setSignature] = useState('');

  //Hacer peticion de datos al servidor
  //const responser  = axios.get(api)
  //Llenado de los datos en useStates
  //setName(responser.data.name)
  //setLastname

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('name', name)
    formData.append('lastname', lastname)
    formData.append('area', area)
    formData.append('signature', signature)
    formData.append('plantel', plantel)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('role', role)


    axios.post('http://localhost/ITAFrontEndWeb/public/api/personalData_registerPersonalUser', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 'Accept': 'application/json'
      }
    })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Form onSubmit={handleSubmit}>

      <Form.Label>Nombre</Form.Label>
      <Form.Control type='text' placeholder='Nombre' onChange={(e) => setName(e.target.value)} />
      <br />

      <Form.Label>Apellidos</Form.Label>
      <Form.Control type='text' placeholder='Apellidos' onChange={(e) => setLastName(e.target.value)} />
      <br />

      <Form.Label>Área</Form.Label>
      <Form.Control type='text' placeholder='Área' onChange={(e) => setArea(e.target.value)} />
      <br />

      <Form.Label>Plantel</Form.Label>
      <Form.Control type='text' placeholder='Plantel' onChange={(e) => setPlantel(e.target.value)} />
      <br />

      <Form.Label>Correo</Form.Label>
      <Form.Control type='email' placeholder='Correo' onChange={(e) => setEmail(e.target.value)} />
      <br />

      <Form.Label>Contraseña</Form.Label>
      <Form.Control type='password' placeholder='Contraseña' onChange={(e) => setPassword(e.target.value)} />
      <br />

      <Form.Label>Rol</Form.Label>
      <Form.Select defaultValue={"Selecciona rol"} type='text' placeholder='Rol' onChange={(e) => setRole(e.target.value)} >
        <option value={'Jefe Departamento'}>Jefe Departamento</option>
        <option value={'Mantenimiento'}>Mantenimiento</option>
      </Form.Select>
      <br />

      <Form.Label>Firma</Form.Label>
      <Stack direction="horizontal" gap={2} className="col-md-6 mx-auto">
        <input id='fileUpload' type='file' style={theme.input} multiple accept='image/png' onChange={(e) => setSignature(e.target.files[0])} />
      </Stack>
      {/*<Form.Control id='fileUpload' type='file' multiple accept='image/png' onChange={(e) => setSignature(e.target.value)} />*/}
      <br />

      <Stack >
        <Stack direction='horizontal' gad={2} className="col-md-2 mx-auto">
          <button style={theme.button} type="submit" className="btn btn-success btn-lg mt-2 mb-2 text-white">
            Registrar
          </button>

          <Button style={theme.button2} href='home'>
            Cancelar
          </Button>
        </Stack>
      </Stack>

    </Form>
  )

}

export default Register;