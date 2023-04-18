import IconMaintenanceRequestsUser from '/src/IconsRequest/IconMaintenanceRequestsUser.png';
import RequestHistoryGray from '/src/IconsRequest/RequestHistoryGray.png';
import ActiveRequestsGray from '/src/IconsRequest/ActiveRequestsGray.png';

import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';

function MaintenanceRequest() {
    return (
        <Container className="mx-auto" fluid style={{ position: 'sticky', paddingTop: 0}} >

            <Stack align="center" style={{ padding: "3%" }} className="mx-auto">
                <img className='col-mb-3 mx-auto' src={IconMaintenanceRequestsUser} width={350} height={100} />
            </Stack>

            <Nav className="flex-column">
                <Stack direction="horizontal" gap={5} align="center" className="mx-auto">
                    <Nav.Item>
                        <Nav.Link href='activeRequest'>
                            <img className='col-mb-3 mx-auto' src={ActiveRequestsGray} width={370} height={120} />
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href='requestHistory'>
                            <img className='col-mb-3 mx-auto' src={RequestHistoryGray} width={400} height={120} align="right"/>
                        </Nav.Link>
                    </Nav.Item>
                </Stack>
            </Nav>

        </Container >
    );
}

export default MaintenanceRequest;