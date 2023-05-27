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
import IconNewUser from '/src/IconsUser/IconNewUser.png';
import { Link } from 'react-router-dom';


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


    axios.post('http://localhost/ITABackEnd/public/api/personalData_registerPersonalUser', formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('user-info')}`
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <section>
        <br />
        <Container>
          <Stack>

            <Stack align="center" gap={3}>
              <div><img className='mb-3' src={IconNewUser} style={theme.optionIcons} width={400} height={100} /></div>
            </Stack>
          </Stack>

        </Container>
      </section>

      <section style={{ paddingBlockEnd: 25 }}>
        <Container fluid className="col-md-9 mx-auto" style={{ position: 'sticky', borderColor: "#1B396A", borderWidth: 3 }}>
          <Form className='text-center form-control-lg' onSubmit={handleSubmit}>

            <Form.Label className='mb-3' style={{ fontWeight: 'bold' }}>Nuevo registro</Form.Label>

            <Form.Group className='row mb-3'>
              <Form.Label className='col-2'>Nombre</Form.Label>
              <Col sm>
                <Form.Control placeholder='Nombre' onChange={(e) => setName(e.target.value)} />
              </Col>
              <Form.Label className='col-2'>Apellidos</Form.Label>
              <Col sm>
                <Form.Control type='text' placeholder='Apellidos' onChange={(e) => setLastName(e.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group className='row mb-3'>
              <Form.Label className='col-2'>Área</Form.Label>
              <Col sm>
                <Form.Control type='text' placeholder='Área' onChange={(e) => setArea(e.target.value)} />
              </Col>
              <Form.Label className='col-2'>Plantel</Form.Label>
              <Col sm>
                <Form.Control type='text' placeholder='Plantel' onChange={(e) => setPlantel(e.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group className='row mb-3'>
              <Form.Label className='col-2'>Correo</Form.Label>
              <Col sm>
                <Form.Control placeholder='Correo' type="email" name="dob" onChange={(e) => setEmail(e.target.value)} />
              </Col>
              <Form.Label className='col-2'>Contraseña</Form.Label>
              <Col sm>
                <Form.Control placeholder='Contraseña' type='password' onChange={(e) => setPassword(e.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
              <Form.Label className='col-2'>Rol</Form.Label>
              <Col>
                <Form.Select type='text' placeholder='Rol' onChange={(e) => setRole(e.target.value)} >
                  <option>Selecciona rol</option>
                  <option value={'Jefe Departamento'}>Jefe Departamento</option>
                  <option value={'Mantenimiento'}>Mantenimiento</option>
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
              <Form.Label className='col-2'>Firma</Form.Label>
              <Col>
                <Stack direction="horizontal" gap={2} >
                <input id='fileUpload' type='file' style={theme.input} multiple accept='image/png' onChange={(e) => setSignature(e.target.files[0])} />
                </Stack>
              </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
              <Row>
                <Col sm>
                  <Button as={Link} to='http://localhost/ITABackEnd/public/home' className="btn btn-danger btn-lg mt-2 mb-2 text-white">
                    Cancelar
                  </Button>
                </Col>
                <Col sm>
                  <Button type="submit" className="btn btn-success btn-lg mt-2 mb-2 text-white">
                    Registrar
                  </Button>
                </Col>
              </Row>
            </Form.Group>

          </Form>
        </Container >
      </section>
    </>
  )

}

export default Register;