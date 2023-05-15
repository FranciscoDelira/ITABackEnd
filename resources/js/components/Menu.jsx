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
        <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#1B396A' }} variant="dark">
          <Container>
            <Navbar.Brand href="home">
              <img className='mb-3 mx-auto' src={TNM2B} width={200} height={80} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="home">Inicio</Nav.Link>
                <NavDropdown title="Solicitudes" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="activeRequest">Solicitudes activas</NavDropdown.Item>
                  <NavDropdown.Item href="requestHistory">Historial de solicitudes</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Órdenes" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="earring">Pendientes</NavDropdown.Item>
                  <NavDropdown.Item href="release">Liberadas</NavDropdown.Item>
                  <NavDropdown.Item href="approved">Aprobadas</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Usuarios" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="register">Crear nuevo usuario</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Estadísticas" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="register">Mostrar</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Nav.Link href="profile">Perfil</Nav.Link>
                <Nav.Link eventKey={2} href="login">Cerrar sesión</Nav.Link>
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