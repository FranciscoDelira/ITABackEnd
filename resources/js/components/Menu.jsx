import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Outlet } from 'react-router-dom';
import TNM2B from '/src/Images/TNM2B.png';


function Menu() {
  return (
    <>
      <div>
        <Navbar collapseOnSelect expand="lg" style={{backgroundColor: '#1B396A'}} variant="dark">
          <Container>
            <Navbar.Brand href="#home">
              <img className='mb-3 mx-auto' src={TNM2B} width={200} height={80} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="home">Home</Nav.Link>
                <NavDropdown title="Solicitudes" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="maintenanceRequest">Solicitudes activas</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Historial de solicitudes
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Órdenes" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Pendientes</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Liberadas
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Aprobadas</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Crear nueva órden
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Nav.Link href="profile">Perfil</Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                  Cerrar sesión
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <section>
        <Container>
          <Outlet>
          </Outlet>
        </Container>
      </section>

    </>

  );
}

export default Menu;