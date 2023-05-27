import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Menu from '../Menu';
import Footer from '../Footer';
import Stack from 'react-bootstrap/Stack';
import IconProfileUse from '/src/IconsOrders/IconProfileUser.png';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import axios from "axios";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import IconProfileUser from '/src/IconsHome/IconProfileUser.png';
import { Link, useParams } from 'react-router-dom';

const theme = {
  nav: {
    backgroundColor: "#1B396A"
  },
  bg: {
    backgroundColor: 'white',
  },
  logo: {
    alignContent: "center",
    width: 70,
    height: 70
  },
  navImg: {
    alignContent: "center",
    weith: 40,
    height: 40
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
  fDText: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: '30px'
  },
  button: {
    color: 'white',
    fontSize: '20px',
    backgroundColor: '#1B396A',
    borderRadius: 15
  },
  optionIcons: {
    align: "center",
    width: 350,
    height: 100
  }
};

const card = {
  backgroundColor: "blue"
};

function Profile() {

  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [area, setArea] = useState('');
  const [plantel, setPlantel] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const { id } = useParams();

  const postData = async () => {
    const response2 = await axios.get('http://localhost/ITABackEnd/public/api/user_show/'
      + localStorage.getItem('user-id'),
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('user-info')}`
        }
      })
    const response = await axios.get(`http://localhost/ITABackEnd/public/api/personalData_show/${response2.data.personaldata_id}`,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('user-info')}`
        }
      })


    const response3 = await axios.get(`http://localhost/ITABackEnd/public/api/user_authProfle`,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('user-info')}`
        }
      })

    //setID(response.data.id)
    setName(response.data.name)
    setLastName(response.data.lastname)
    setArea(response.data.area)
    setPlantel(response.data.plantel)
    setEmail(response.data.email)
    setEmail(response2.data.email)
    setRole(response2.data.role)
  }

  useEffect(() => {
    postData()
  }, [])

  return (
    <>

      <section>
        <br />
        <Container>
          <Stack>
            <Stack align="center">
              <div><img className='mb-3' src={IconProfileUser} style={theme.optionIcons} width={300} height={50} /></div>
            </Stack>
          </Stack>
        </Container>
      </section>

      <section>
        <Container fluid className="col-md-9 mx-auto" style={{ position: 'sticky', borderColor: "#1B396A", borderWidth: 3 }}>
          <Form className='text-center form-control-lg'>

            <Form.Label className='mb-5' style={{ fontWeight: 'bold' }}>Información personal</Form.Label>

            <Form.Group className="row mb-3">
              <Form.Label className='col-2'>Nombre</Form.Label>
              <Col>
                <Form.Control value={name} placeholder='Nombre' disabled />
              </Col>
              <Form.Label className='col-2'>Apellidos</Form.Label>
              <Col>
                <Form.Control value={lastname} placeholder='Apellidos' disabled />
              </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
              <Form.Label className='col-2'>Área</Form.Label>
              <Col>
                <Form.Control value={area} placeholder='Área' disabled />
              </Col>
              <Form.Label className='col-2'>Plantel</Form.Label>
              <Col>
                <Form.Control value={plantel} placeholder='Plantel' disabled />
              </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
              <Form.Label className='col-2'>Correo</Form.Label>
              <Col>
                <Form.Control value={email} placeholder='Correo' disabled />
              </Col>
              <Form.Label className='col-2'>Rol</Form.Label>
              <Col>
                <Form.Control value={role} placeholder='Contraseña' disabled />
              </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
              <Col>
                <Button>Regresar</Button>
              </Col>
              <Col>
                <Button as={Link} to='http://localhost/ITABackEnd/public/editProfile' className="btn btn-success">Editar</Button>
              </Col>
            </Form.Group>

          </Form>
        </Container>
      </section>
    </>
  );
}
export default Profile;