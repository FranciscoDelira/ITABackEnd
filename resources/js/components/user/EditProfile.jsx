import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import axios from 'axios';
import { auto, left } from '@popperjs/core';
import { Link, useNavigate, useParams } from "react-router-dom";

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
  }, input: {
    color: 'white',
    fontSize: '20px',
    backgroundColor: '#1B396A',
  }
};

const card = {
  backgroundColor: "yellow"
};

function EditProfile() {


  /*===============================================AXIOS======================================*/

  const HEADERS = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("user-info")}`,
    },
  };

  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [area, setArea] = useState('');
  const [plantel, setPlantel] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signature, setSignature] = useState('');

  const getData = async () => {
    const response = await axios.get('http://localhost/ITAFrontEndWeb/public/api/user_show/' + 1)//id del usuario en sesion
    const responseTwo = await axios.get('http://localhost/ITAFrontEndWeb/public/api/personalData_show/' + response.data.personaldata_id)
    console.log(response, responseTwo)
    setEmail(response.data.email)
    setPassword(response.data.password)
    setRole(response.data.role)

    setName(responseTwo.data.name)
    setLastName(responseTwo.data.lastname)
    setArea(responseTwo.data.area)
    setPlantel(responseTwo.data.plantel)
    setSignature(responseTwo.data.signature)
  }

  useEffect(()=>
    {
      getData()
    },[])



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
    console.log(role)
    

    //hacer update de tabla user
    axios.post(`http://localhost/ITAFrontEndWeb/public/api/personalData_updateProfile/${1}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 'Accept': 'application/json'
      }
    })
      .catch((error) => {
        console.log(error);
      });
  }

  //FIN AXIOS----------------------

  /*==============================================FORMULARIO===================================================*/

  return (
    <>
      <section>
        <Container fluid style={{ padding: 40, position: 'sticky', alignItems: 'center' }}>
          <Form onSubmit={handleSubmit}>

            <Form.Label>Nombre</Form.Label>
            <Form.Control type='text'  value={name} onChange={(e) => setName(e.target.value)} />
            <br />

            <Form.Label>Apellidos</Form.Label>
            <Form.Control type='text' placeholder='Apellidos' value={lastname} onChange={(e) => setLastName(e.target.value)} />
            <br />

            <Form.Label>Área</Form.Label>
            <Form.Control type='text' placeholder='Área' value={area} onChange={(e) => setArea(e.target.value)} />
            <br />

            <Form.Label>Plantel</Form.Label>
            <Form.Control type='text' placeholder='Plantel' value={plantel} onChange={(e) => setPlantel(e.target.value)} />
            <br />

            <Form.Label>Correo</Form.Label>
            <Form.Control type='email' placeholder='Correo' value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />

            <Form.Label>Contraseña</Form.Label>
            <Form.Control type='password' placeholder='Contraseña' value={password} onChange={(e) => setPassword(e.target.value)} />
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

            <button type="submit" className="btn btn-success btn-lg mt-2 mb-2 text-white">
              Registrar
            </button>

          </Form>

        </Container>
      </section>
    </>
  );
}

export default EditProfile;