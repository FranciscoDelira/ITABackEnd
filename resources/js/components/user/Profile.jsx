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

  const [name, setName] = useState([]);
  const [lastname, setLastName] = useState([]);
  const [area, setArea] = useState([]);
  const [plantel, setPlantel] = useState([]);

  const postData = async () => {
    const response = await axios.get('http://localhost/ITAFrontEndWeb/public/api/personalData_show/1');

    setName(response.data.name)
    setLastName(response.data.lastname)
    setArea(response.data.area)
    setPlantel(response.data.plantel)
  }

  useEffect(() => {
    postData()
  }, [])

  return (
    <>
      <section>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control value={name} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Apellidos</Form.Label>
          <Form.Control value={lastname} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Area</Form.Label>
          <Form.Control value={area} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Plantel</Form.Label>
          <Form.Control value={plantel} disabled />
        </Form.Group>
      </section>
    </>
  );
}
export default Profile;