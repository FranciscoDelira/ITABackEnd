import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet } from 'react-router-dom';

function Menu() {
    return (
      <>
        <div style={{ backgroundColor: "#1B396A"}} expand="lg">
        <Navbar style={{ backgroundColor: "#1B396A"}}>
          <Container>
            <Navbar.Brand href="#home" style={{ fontSize: '40px', color: "white"}}>Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="" style={{ fontSize: '25px', color: "white"}}>Home</Nav.Link>
              <Nav.Link as={Link} to="login" style={{ fontSize: '25px', color: "white"}}>Solicitudes</Nav.Link>
              <Nav.Link as={Link} to="register" style={{ fontSize: '25px', color: "white"}}>Ordenes</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <section>
          <Container>
            <Outlet>
            </Outlet>
          </Container>
        </section>
        </div>
      </>
      
    );
  }
  
  export default Menu;