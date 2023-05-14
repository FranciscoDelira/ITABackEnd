import IconMaintenanceRequestsUser from '/src/IconsHome/IconMaintenanceRequestsUser.png';
import IconOrdersUser from '/src/IconsHome/IconOrdersUser.png';
import IconNewUser from '/src/IconsHome/IconNewUser.png';
import CreateNewOrder from '/src/IconsOrders/CreateNewOrder.png'

import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';
import Footer from './Footer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {

    return (
        <>
            <Container fluid style={{ position: 'sticky', paddingTop: 25, }} >
                <Stack align="center" style={{ padding: "2%" }}>

                    <Nav className="flex-column">

                        <Nav.Item>
                            <Stack direction='horizontal' align="center" style={{ padding: "3%" }} className="mx-auto">
                                <Row> 
                                    <Col sm={6}>
                                        <Nav.Link href='earring'>
                                            <img className='col-mb-3 mx-auto' src={IconOrdersUser} width={390} height={100} />
                                        </Nav.Link>
                                    </Col>
                                    <Col sm={4}>
                                        <Nav.Link href='newOrder'>
                                            <img className='col-mb-3 mx-auto' src={CreateNewOrder} width={390} height={100} />
                                        </Nav.Link>
                                    </Col>
                                </Row>
                            </Stack>

                            <Stack direction='horizontal' align="center" style={{ padding: "3%" }} className="mx-auto">
                                <Row>
                                    <Col sm={6}>
                                        <Nav.Link href='activeRequest'>
                                            <img className='col-mb-3 mx-auto' src={IconMaintenanceRequestsUser} width={390} height={100} />
                                        </Nav.Link>
                                    </Col>
                                    <Col sm={4}>
                                        <Nav.Link href='register'>
                                            <img className='col-mb-3 mx-auto' src={IconNewUser} width={390} height={100} />
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