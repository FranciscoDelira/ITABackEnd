import IconMaintenanceRequestsUser from '/src/IconsHome/IconMaintenanceRequestsUser.png';
import IconOrdersUser from '/src/IconsHome/IconOrdersUser.png';
import IconNewUser from '/src/IconsHome/IconNewUser.png';
import CreateNewOrder from '/src/IconsOrders/CreateNewOrder.png'

import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {

    return (
        <>
            <Container fluid style={{ position: 'sticky', paddingTop: 25 }} className="d-flex align-items-center">
                <Stack align="center" className="mx-auto">
                    <Nav className="flex-column">
                        <Nav.Item>
                            <Stack align="center" style={{ padding: "3%" }} className="mx-auto justify-content-center align-items-center">
                                <Row>
                                    <Col sm>
                                        <Nav.Link href='earring'>
                                            <img className='col-mb-3 mx-auto' src={IconOrdersUser} width={380} height={100} />
                                        </Nav.Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm>
                                        <Nav.Link href='activeRequest'>
                                            <img className='col-mb-3 mx-auto' src={IconMaintenanceRequestsUser} width={380} height={100} />
                                        </Nav.Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm>
                                        <Nav.Link href='register'>
                                            <img className='col-mb-3 mx-auto' src={IconNewUser} width={380} height={100} />
                                        </Nav.Link>
                                    </Col>
                                </Row>
                            </Stack>
                        </Nav.Item>
                    </Nav>
                </Stack>
            </Container>


        </>
    );

}

export default Home;