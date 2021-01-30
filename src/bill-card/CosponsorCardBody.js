import {useState, useEffect} from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import {PropublicaApi} from './../api/api';
import CosponsorRow from './CosponsorRow';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import PoliticianCard from './../politicians/PoliticianCard';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Collapse from 'react-bootstrap/Collapse';

const CosponsorCardBody = ({billId}) => {
    const [sponsor, setSponsor] = useState(); 
    const [cosponsors, setCosponsors] = useState();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function getSponsors() {
            const resp = await PropublicaApi.getBillCosponsers(billId);
            const sponsorResp = await PropublicaApi.getPoliticianById(resp.sponsor_id);
            setSponsor(sponsorResp);
            setCosponsors(resp.cosponsors); 
        }
        getSponsors();
    }, []); 

    return(
        <Card.Body>
            <Container>
                <Row>
                    <Col>
                        {sponsor ? <PoliticianCard pol={sponsor}/> : <LoadingSpinner/>}
                    </Col>
                    <Col>
                        <h3>Co-Sponsors</h3>

                        {cosponsors && cosponsors.length ? cosponsors.slice(0, 6).map(cs => (
                            <CosponsorRow cosponsor={cs}/>
                            )) : <LoadingSpinner/>}

                            <Collapse in={open}>
                                <div>

                                {cosponsors ? cosponsors.slice(6).map(cs => (
                                    <CosponsorRow cosponsor={cs}/>
                                    )): ""}
                                </div>
                            </Collapse>
                        <ListGroup.Item onClick={() => setOpen(!open)}><a>Click to {open ? "Close" : "Expand"}</a></ListGroup.Item>

                    </Col>
                </Row>
            </Container>
        </Card.Body>
    )
}

export default CosponsorCardBody; 

