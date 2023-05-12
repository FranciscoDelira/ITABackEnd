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
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  /*===============================================AXIOS======================================*/

  const ruta = "http://localhost/ITAFrontEndWeb/public/api/personalData_update/";
  const ruta2 = "http://localhost/ITAFrontEndWeb/public/api/personalData_show/";
  const ruta3 = "http://localhost/ITAFrontEndWeb/public/api/user_update/";
  const ruta4 = "http://localhost/ITAFrontEndWeb/public/api/user_show/";

  const HEADERS = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("user-info")}`,
    },
  };

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [area, setArea] = useState("");
  const [plantel, setPlantel] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  
  const navigate = useNavigate();

  const { id } = useParams();

  //const [school, setSchool] = useState([]);

  const updatePersonalData = async (e) => {
    e.preventDefault();
    await axios.put(
      `${ruta}${id}`,
      {
        name: name,
        lastName: lastName,
        area: area,
        plantel: plantel,
      },
      HEADERS
    );
    //navigate("/showCareer");
  };

  const updateUser = async (e) => {
    e.preventDefault();
    await axios.put(
      `${ruta3}${id}`,
      {
        email: email,
        password: password,
        role: role,
      },
      HEADERS
    );
    //navigate("/showCareer");
  };

  useEffect(() => {
    const getPersonalDataById = async () => {
      const response = await axios.get(`${ruta2}${id}`, HEADERS);
      setName(response?.data?.name);
      setLastName(response?.data?.lastName);
      setArea(response?.data?.area);
      setPlantel(response?.data?.plantel);
    };
    getPersonalDataById();

    const getUserById = async () => {
      const response = await axios.get(`${ruta4}${id}`, HEADERS);
      setEmail(response?.data?.name);
      setPassword(response?.data?.lastName);
      setRole(response?.data?.area);
    };
    getUserById();
  }, []);

  const handle = function (e) {
    const option = e.target.value;
    //console.log(option);

    setIdSchool(option);
  };

  //FIN AXIOS----------------------

  const [input, setInput] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    confirmEmail: ''

  });

  const [error, setError] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    confirmEmail: ''
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

  /*==============================================FORMULARIO===================================================*/

  return (
    <>
      <section>
        <Container fluid style={{ padding: 40, position: 'sticky', alignItems: 'center' }}>
          <Stack align="center" className="col-md-6 mx-auto" style={{ borderColor: "#1B396A", borderWidth: 3 }}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <h1 style={theme.header}>Editar Usuario</h1>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <h1 style={theme.fHText}>Nombre</h1>
                  <Form.Control
                    required
                    value={name}
                    type="text"
                    placeholder="Nombre"
                    style={theme.fControl}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <h1 style={theme.fHText}>Apellidos</h1>
                  <Form.Control
                    required
                    type="text"
                    style={theme.fControl}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <h1 style={theme.fHText}>Area</h1>
                  <Form.Control
                    required
                    type="text"
                    style={theme.fControl}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <h1 style={theme.fHText}>Plantel</h1>
                  <Form.Control
                    required
                    type="text"
                    style={theme.fControl}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <h1 style={theme.fHText}>Correo</h1>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    onBlur={validateInput}
                    onChange={onInputChange}
                    style={theme.fControl}
                  />
                  {error.email && <span className='err'>{error.email}</span>}
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <h1 style={theme.fHText}>Rol</h1>
                  <Form.Control
                    required
                    type="text"
                    style={theme.fControl}
                  />
                </Form.Group>
              </Row>

              <Row className="m-2">
                <Stack>
                  <h1 style={theme.fHText}>Subir firma</h1>
                </Stack>
                <Stack direction="horizontal" gap={2} className="col-md-6 mx-auto">
                  <input id='fileUpload' type='file' style={theme.input} multiple accept='application/pdf, image/png' responsive />
                </Stack>
              </Row>
              <Stack direction="horizontal" gap={2} className="col-md-9 mx-auto">
                
                <Button type="submit" style={theme.button}>Guardar</Button>
          
                <Button type="submit" align="right" style={theme.button2}>Cancelar</Button>

              </Stack>
            </Form>
            <br />
          </Stack>

        </Container>
      </section>
    </>
  );
}

export default EditProfile;