import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge'; 

const BillTitle = ({bill}) => {
    
    return(
            <Container>
                <Row>
                    <Col>
                        <h3>{bill.bill}: {bill.title}</h3>
                    </Col>
                </Row>

            </Container>
    )
}

export default BillTitle;