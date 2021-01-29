import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'; 
import congressLogo from './../images/congressLogo.png';
import govtrackLogo from './../images/govtrackLogo.png';
import './BillLinks.css';

const BillLinks = ({bill}) => {
    return(
        <Card.Body>
            <Row>
                <Col>
                    <a href={`${bill.congressdotgov_url}/text`}><Image src={congressLogo} id='logo'/>
                    <p>Full Bill Text from Congess.gov</p></a>
                </Col>
                <Col>
                    <a href={bill.govtrack_url}><Image src={govtrackLogo} id='logo'/>
                    <p>Supplementary Data from Govtrack.com</p></a>
                </Col>
                <Col>
                    {bill.presidential_statements.length ? 
                    <div>

                        <h3>White House Statements</h3>
                        <ul>
                            {bill.presidential_statements.map((ps, idx) => (
                                <li><a href={ps.url}>Presidential Statement {idx + 1}</a></li>
                                ))}
                        </ul>    
                    </div>
                    : ""}
                </Col>
            </Row>
        </Card.Body>
    )
}

export default BillLinks; 