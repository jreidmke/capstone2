import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {dateTimeFormatter} from '../helpers/helpers';
import './CurrentTerm.css';

const CurrentTerm = ({politician}) => {
    return(
        <Container>
            <Row id='top'>
                <Col>
                    <h4>
                        {dateTimeFormatter(politician.start_date)} to {dateTimeFormatter(politician.end_date)}
                    </h4>
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col>
                    <h5>Sponsorships:</h5>
                    <p>Bills Sponsored this Term: {politician.bills_sponsored}</p>
                    <p>Bills Cosponsored this Term: {politician.bills_cosponsored}</p>
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col>
                    <h6>Votes this Term:</h6>
                    <p>Total Votes: {politician.total_votes}</p>
                    <p>Total Present: {politician.total_present}</p>
                    <p>Vote with Party %: {politician.votes_with_party_pct}</p>
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col>
                    {politician.subcommittees.length ? (
                        <ul>
                            {politician.subcommittees.map(sc => (
                                <li>{sc.name}</li>
                            ))}
                        </ul>
                    ) : ""}
                </Col>
            </Row>

        </Container>
    )
}

export default CurrentTerm; 