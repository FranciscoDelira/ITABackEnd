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
import IconUser from '/src/IconsUser/IconUser.png';
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

  const headers = {
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
    const response = await axios.get('http://localhost/ITABackEnd/public/api/user_show/' + localStorage.getItem('user-id'),
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('user-info')}`
        }
      })//id del usuario en sesion
    const responseTwo = await axios.get('http://localhost/ITABackEnd/public/api/personalData_show/' + response.data.personaldata_id,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('user-info')}`
        }
      })
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

  useEffect(() => {
    getData()
  }, [])



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
    axios.post(`http://localhost/ITABackEnd/public/api/personalData_updateProfile/${id}`, formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('user-info')}`
        }
      })
      .then((response) => {
        console.log(response);
        swal({
          title: "Guardado",
          text: "Información actualizada correctamente",
          icon: "success",
          buttons: false,
          timer: 2000
        }).then(() => {
          window.location.href = 'http://localhost/ITABackEnd/public/profile';
        });
      })
      .catch((error) => {
        console.log(error);
        swal({
          titlle: "Error al actualizar perfil",
          text: "Revisar la información que sea correcta",
          icon: "error",
          buttons: "Aceptar"
        })
      });
  }

  //FIN AXIOS----------------------

  /*==============================================FORMULARIO===================================================*/

  return (
    <>

      <section>
        <br />
        <Container>
          <Stack>

            <Stack align="center">
              <div><img className='mb-3' src={IconUser} style={theme.optionIcons} width={300} height={100} /></div>
            </Stack>
          </Stack>

        </Container>
      </section>

      <section style={{ paddingBlockEnd: 25 }}>
        <Container fluid className="col-md-9 mx-auto" style={{ padding: 40, position: 'sticky', alignItems: 'center', borderColor: "#1B396A", borderWidth: 3 }}>
          <Form onSubmit={handleSubmit} className='text-center form-control-lg'>

            <Form.Label className='mb-5' style={{ fontWeight: 'bold' }}>Editar información personal</Form.Label>

            <Form.Group className="row mb-3">
              <Form.Label className='col-2'>Nombre</Form.Label>
              <Col sm>
                <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Nombre' />
              </Col>
              <Form.Label className='col-2'>Apellidos</Form.Label>
              <Col sm>
                <Form.Control type='text' value={lastname} onChange={(e) => setLastName(e.target.value)} placeholder='Apellidos' />
              </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
              <Form.Label className='col-2'>Área</Form.Label>
              <Col sm>
                <Form.Control type='text' value={area} onChange={(e) => setArea(e.target.value)} placeholder='Área' />
              </Col>
              <Form.Label className='col-2'>Plantel</Form.Label>
              <Col sm>
                <Form.Control type='text' value={plantel} onChange={(e) => setPlantel(e.target.value)} placeholder='Plantel' />
              </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
              <Form.Label className='col-2'>Correo</Form.Label>
              <Col sm>
                <Form.Control type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Correo' />
              </Col>
              <Form.Label className='col-2'>Contraseña</Form.Label>
              <Col sm>
                <Form.Control type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Contraseña' />
              </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
              <Form.Label className='col-2'>Rol</Form.Label>
              <Col sm>
                <Form.Select type='text' placeholder='Rol' onChange={(e) => setRole(e.target.value)} >
                  <option>Selecciona rol</option>
                  <option value={'Jefe Departamento'}>Jefe Departamento</option>
                  <option value={'Mantenimiento'}>Mantenimiento</option>
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
              <Form.Label className='col-2'>Firma</Form.Label>
              <Col sm>
                <Stack direction="horizontal" gap={2} >
                  <input id='fileUpload' type='file' style={theme.input} multiple accept='image/png' onChange={(e) => setSignature(e.target.files[0])} />
                </Stack>
              </Col>
            </Form.Group>

            {/*<Form.Control id='fileUpload' type='file' multiple accept='image/png' onChange={(e) => setSignature(e.target.value)} className="col-md-6 mx-auto" />*/}
            <Row>
              <Col sm>
                <Button as={Link} to='http://localhost/ITABackEnd/public/profile' className="btn btn-danger btn-lg mt-2 mb-2 text-white">
                  Cancelar
                </Button>
              </Col>
              <Col sm>
                <Button type="submit" className="btn btn-success btn-lg mt-2 mb-2 text-white">
                  Aceptar
                </Button>
              </Col>
            </Row>


          </Form>

        </Container>
      </section>
    </>
  );
}

export default EditProfile;