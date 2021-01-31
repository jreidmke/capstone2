import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './PoliticianContact.css'
import StatementList from '../statements/StatementList';
import {PropublicaApi} from '../api/api';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

const PoliticianContact = ({pol}) => {
    const [statements, setStatements] = useState();

    useEffect(() => {
        async function getStatements() {
            const resp = await PropublicaApi.getStatementsByPolitician(pol.id);
            setStatements(resp);
        }
        getStatements();
    }, []);

    return(
        <Container>
            <Row className='mt-5'>
                <Col><a href={`http://www.twitter.com/${pol.twitter_account}`}><FontAwesomeIcon icon={faTwitter} size='6x'/></a></Col>
                <Col><a href={`http://www.facebook.com/${pol.facebook_account}`}><FontAwesomeIcon icon={faFacebook} size='6x'/></a></Col>
                <Col><a href={`http://www.youtube.com/${pol.youtube_account}`}><FontAwesomeIcon icon={faYoutube} size='6x'/></a></Col>
            </Row>
            <hr/>
            <ul style={{listStyle: "none"}}>
                <li><a href={pol.url}>Website</a></li>
                <li>Office Address: {pol.roles[0].office}</li>
                <li>Phone Number: {pol.roles[0].phone}</li>
            </ul>
            <hr/>
            {statements ? <StatementList statements={statements}/> : <LoadingSpinner/>}
        </Container>
    )
}

export default PoliticianContact;
