import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Outlet } from 'react-router-dom';
import TNM2B from '/src/Images/TNM2B.png';


function Menu() {

  const handleLogout = () => {
    localStorage.removeItem('user-info');
    window.location.href = 'http://localhost/ITABackEnd/public/login'
  }

  return (
    <>
      <div>
        <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#1B396A' }} variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="http://localhost/ITABackEnd/public/home">
              <img className='mb-3 mx-auto' src={TNM2B} width={200} height={80} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to='http://localhost/ITABackEnd/public/home'>Inicio</Nav.Link>
                <NavDropdown title="Solicitudes" id="collasible-nav-dropdown">
                  <NavDropdown.Item as={Link} to='http://localhost/ITABackEnd/public/activeRequest'>Solicitudes activas</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='http://localhost/ITABackEnd/public/requestHistory'>Historial de solicitudes</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Órdenes" id="collasible-nav-dropdown">
                  <NavDropdown.Item as={Link} to='http://localhost/ITABackEnd/public/earring'>Pendientes</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='http://localhost/ITABackEnd/public/release'>Liberadas</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='http://localhost/ITABackEnd/public/approved'>Aprobadas</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Usuarios" id="collasible-nav-dropdown">
                  <NavDropdown.Item as={Link} to='http://localhost/ITABackEnd/public/register'>Crear nuevo usuario</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Nav.Link href="profile">Perfil</Nav.Link>
                <Nav.Link eventKey={2} onClick={handleLogout}>Cerrar sesión</Nav.Link>
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