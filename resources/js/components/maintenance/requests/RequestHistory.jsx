import RequestHistoryGray from '/src/IconsRequest/RequestHistoryGray.png';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';

function RequestHistory(){
    return(
        <Container>
            <Stack align="center" style={{ padding: "3%" }} className="mx-auto">
                <img className='col-mb-3 mx-auto' src={RequestHistoryGray} width={280} height={90} />
            </Stack>

            <Table responsive="md">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Folio</th>
                        <th>Fecha</th>
                        <th>Departamento</th>
                        <th>Descripción</th>
                        <th>Evidencia</th>
                        <th>Asignado a</th>
                        <th>Fecha de realización</th>
                        <th>Trabajo realizado</th>
                        <th>Evidencia de trabajo</th>
                        <th>Estatus</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
}

export default RequestHistory;