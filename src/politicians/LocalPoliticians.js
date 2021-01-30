import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {PropublicaApi} from './../api/api';
import LoadingSpinner from './../common/LoadingSpinner';
import {getStateAndCd} from './../helpers/helpers';
import YourSenators from './YourSenators';
import PoliticianCard from './PoliticianCard';
import Modal from './../common/Modal';
import {wheresMyRep} from './../modalMessages';

const LocalPoliticians = () => {
    const {ocdDivId} = useParams();
    const [senators, setSentators] = useState();
    const [represetative, setRepresentative] = useState();
    const locale = getStateAndCd(ocdDivId);

    useEffect(() => {
        async function getPoliticians() {
            const resp = await PropublicaApi.getPoliticiansByOcd(ocdDivId);
            setSentators(resp[0]);
            if(!resp[1]) return;
            setRepresentative(resp[1]);
        }
        getPoliticians()
    }, []);


    return(
        <div>


            {console.log(senators)}
            <Container>
                <Row><Col/><h1>The Politicians of {locale.state.toUpperCase()}, Congressional District: {locale.cd}</h1><Col/></Row>
                <Row><hr/></Row>
                <Row>
                    <Col/>
                    <Col>
                        {senators ? <YourSenators senators={senators}/> : <LoadingSpinner/>}
                    </Col>
                    <Col/>
                    <Col>
                        {represetative ? <PoliticianCard pol={represetative} chamber='house'/> : <Modal message={wheresMyRep}/>}
                    </Col>
                    <Col/>
                </Row>
                <h5><Row><Col/><Col>Your Senators</Col><Col/><Col>Your Representative</Col><Col/></Row></h5>
            </Container>

            
            
        </div>
        
    )
}

export default LocalPoliticians;

