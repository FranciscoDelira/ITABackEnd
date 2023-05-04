import IconMaintenanceRequestsUser from '/src/IconsHome/IconMaintenanceRequestsUser.png';
import IconOrdersUser from '/src/IconsHome/IconOrdersUser.png';
import IconNewUser from '/src/IconsHome/IconNewUser.png';
import CreateNewOrder from '/src/IconsOrders/CreateNewOrder.png'

import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';
import Footer from './Footer';

function Home() {

    return (
        <>
            <Container fluid style={{ position: 'sticky', paddingTop: 25, paddingLeft: 100 }} >
                <Stack align="center" style={{ padding: "2%" }}>

                    <Nav className="flex-column">

                        <Nav.Item>
                            <Stack direction='horizontal'>
                                <Nav.Link href='earring'>
                                    <img className='col-mb-3 mx-auto' src={IconOrdersUser} width={390} height={100} />
                                </Nav.Link>

                                <Nav.Link href='newOrder'>
                                    <img className='col-mb-3 mx-auto' src={CreateNewOrder} width={390} height={100} />
                                </Nav.Link>
                            </Stack>

                            <Stack direction='horizontal'>
                                <Nav.Link href='activeRequest'>
                                    <img className='col-mb-3 mx-auto' src={IconMaintenanceRequestsUser} width={390} height={100} />
                                </Nav.Link>

                                <Nav.Link href='newUser'>
                                    <img className='col-mb-3 mx-auto' src={IconNewUser} width={390} height={100} />
                                </Nav.Link>
                            </Stack>


                        </Nav.Item>

                    </Nav>

                </Stack>

            </Container>
        </>
    );

}

export default Home;