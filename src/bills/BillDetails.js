import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
// import {getBillData} from './../api/api';
import {PropublicaApi} from './../api/api2';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {FaArrowDown} from 'react-icons/fa';
import LoadingSpinner from './../common/LoadingSpinner';
import BillHistoryVotes from './BillHistoryVotes';
import BillHistoryActions from './BillHistoryActions'
import BillTitle from './BillTItle';
import BillCard from './../bill-card/BillCard'; 
import './BillDetails.css';
import {RiGovernmentFill, RiAwardFill} from 'react-icons/ri';
import {BsAwardFill} from 'react-icons/bs'
import {dateTimeFormatter} from './../helpers/helpers';

const BillDetails = () => {
    const {billId} = useParams();
    const [bill, setBill] = useState();
    const [isEnacted, setIsEnacted] = useState();

    useEffect(() => {
        async function getBill() {
            const resp = await PropublicaApi.getBillData(billId);
            setBill(resp);
            setIsEnacted(resp.enacted); 
        };
        getBill(); 
    }, []);


    return(
        <Container>

            <Row id='title'>
                {!bill ? <LoadingSpinner/> :
                <BillTitle bill={bill}/>}
            </Row>
            
            <Row>
                <Col/>
                <Col xs={6}>
                    <RiGovernmentFill size='10em'/>
                </Col>
                <Col>
                    {isEnacted ? 
                    <Col>
                        <h6><b>Bill Enacted on {dateTimeFormatter(isEnacted)}</b></h6>
                        <BsAwardFill size='10em' color='gold' id='enacted-seal'/>
                    </Col> : ""}
                </Col>
            </Row>

            <Row id='card'>
                <Col>
                    {bill ? <BillCard bill={bill}/> : <LoadingSpinner/>}
                </Col>
            </Row>

            <hr/>

            <Row id='directions'>
                <Col>
                    <h2>For More Information, Scroll Down</h2>
                </Col>
            </Row>

            <Row id='arrow'>
                <Col>
                    <FaArrowDown size='10em' color='white'/>
                </Col>
            </Row>

            <Row id='tables'>
                <Col>
                    <h3>Complete Bill Actions</h3>
                    {bill ? <BillHistoryActions votes={bill.actions}/> : ""}
                </Col>

                <Col>
                    <h3>Complete Bill Vote List</h3>
                    {bill ? <BillHistoryVotes votes={bill.votes}/> : ""}
                </Col>
            </Row>
            
        </Container>
    )
}

export default BillDetails;


