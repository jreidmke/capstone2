import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const NomineeTable = ({nominee}) => {
    return(
        <Container>
            <Row>
                <Col>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <td>Date</td>
                                <td>Question</td>
                                <td>Total No</td>
                                <td>Total Yes</td>
                                <td>Total No Vote</td>
                            </tr>
                        </thead>
                        <tbody>
                            {nominee.votes.map(v => (
                                <tr>
                                    <td>{v.date}</td>
                                    <td>{v.question}</td>
                                    <td>{v.total_no}</td>
                                    <td>{v.total_yes}</td>
                                    <td>{v.total_not_voting}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>

                <ListGroup>
                    {nominee.actions.map(a => (
                        <ListGroup.Item variant={a.description.includes("Confirmed") ? 'success' : ''}>{a.date}: {a.description}</ListGroup.Item>
                    ))}
                </ListGroup>

            </Row>
        </Container>
    )
}

export default NomineeTable;