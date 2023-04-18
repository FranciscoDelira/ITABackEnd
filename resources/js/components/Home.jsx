import IconMaintenanceRequestsUser from '/src/IconsHome/IconMaintenanceRequestsUser.png';
import IconOrdersUser from '/src/IconsHome/IconOrdersUser.png';
import IconProfileUser from '/src/IconsHome/IconProfileUser.png';

import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';

function Home() {

    return (

        <Container className="col-md-5 mx-auto" fluid style={{ padding: 4, position: 'sticky', paddingTop: 30 }} >
            <Stack align="center" style={{ padding: "2%" }}>

                <Nav className="flex-column">
                    <Nav.Item>
                        <Nav.Link href='maintenanceRequest'>
                            <img className='col-mb-3 mx-auto' src={IconMaintenanceRequestsUser} width={380} height={100} />
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href='workOrders'>
                            <img className='col-mb-3 mx-auto' src={IconOrdersUser} width={380} height={100} />
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href='profile'>
                            <img className='col-mb-3 mx-auto' src={IconProfileUser} width={280} height={100} />
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

            </Stack>
        </Container>

    );

}

export default Home;