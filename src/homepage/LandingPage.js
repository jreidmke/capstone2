import Image from 'react-bootstrap/Image'; 
import './Landingpage.css';
import capImg from './../images/capitol-image.jpg'; 
import conImg from './../images/old-congress.jpg';
import modImg from './../images/modern-congress.jpg'; 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'; 
import { FaArrowDown } from 'react-icons/fa'; 
import { GiCongress } from 'react-icons/gi'; 
import {Link} from 'react-router-dom'; 

const LandingPage = () => {
    return(
        <Container id='landingpage-container'>

            <Row id='top-row'>
                <Col>
                    <h1 className='mt-2'>Welcome to Article 1</h1>
                    <GiCongress size='5em'/>
                    <hr/>
                    <h3>Your one stop shop for info on the Bills, Senators and Representatives that make up the U.S. Capitol.</h3>
                </Col>
                <Col>
                    <Image src={capImg} id='landingpage-img'/>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FaArrowDown size='10em' color='white'/>
                </Col>
            </Row>

            <Row id='how-to-row'>
                <Col>
                    <Image src={conImg} id='landingpage-img'/>
                </Col>
                <Col>
                    <h1>Search by Bill or by Politician</h1>
                    <hr/>
                    <h3>Article 1 uses multiple, up-to-date API's to supply you with what's happening right now in Congress. Read about how your Senator voted on the latest controversial bill. Or see who donated to their campaign!</h3>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FaArrowDown size='10em' color='white'/>
                </Col>
            </Row>

            <Row id='bottom-row'>
                <Col>
                    <h1>Keep Up to Date with Reps and Senators Across the U.S.</h1>
                    <hr/>
                    <h3>Use our location-based search to discover who represents the constituents of the towns, cities and rural spaces that make up America.</h3>
                </Col>
                <Col>
                    <Image src={modImg} id='landingpage-img'/>
                </Col>
            </Row>

            <Row>
                <Col>
                    <a href='/home'><GiCongress size='10em' id='bottom-icon'/></a>
                </Col>
            </Row>

            <Row className='my-5'>
                <Col>
                    <h4>Click the Capitol Building to Start</h4>
                </Col>
            </Row>

        </Container>
    )
}

export default LandingPage;
