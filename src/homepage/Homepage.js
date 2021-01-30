import RecentBillCard from './../recent-bills/RecentBillCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'; 
import './Homepage.css'; 
import BillForm from './../searches/BillForm';
import SimpleMap from '../map/Map';
import chamberImage from './../images/chamberImage.jpg';
import constitutionImage from './../images/constitutionImage.jpg';
import { FaArrowLeft, FaArrowDown } from 'react-icons/fa'; 
import * as Scroll from 'react-scroll';
import CustomAlert from './../common/Alert';


const Hompage = () => {
    return(

        <Container>
        <CustomAlert color='danger' message='Nomination Data is Currently Down! We apologize for the inconvenience.'/>

            <Row className='my-5'>
                <Col><h2>To begin, select what you want to search!</h2></Col>
            </Row>

            <Row>
                
                <Col><FaArrowDown size='5em' color='white'/></Col>
                <Col><FaArrowDown size='5em' color='white'/></Col>
            </Row>

            <Row id='image-row'>
                <Col>

                    <Scroll.Link activeClass="active" className="pol-search-link" to="politician-search" spy={true} smooth={true} duration={500}>
                            <h4>I want to search <b>Politicians</b>.</h4>
                            <img src={chamberImage} id='link-img'/>
                    </Scroll.Link>
                </Col>

                <Col>
                    <Scroll.Link activeClass="active" className="bill-search-link" to="bill-search" spy={true} smooth={true} duration={500}>
                        <h4>I want to search <b>Bills</b>.</h4>
                        <img src={constitutionImage} id='link-img'/>
                    </Scroll.Link>
                </Col>
            </Row>

            <Row>

            </Row>


            <br/><br/>
            <br/><br/>
            <br/><br/>
            <br/><br/>
            <br/><br/>
            <br/><br/>
            <br/><br/>
            <br/><br/>
            <br/><br/>
            <br/><br/>
            <br/><br/>
            
                <Scroll.Element name="politician-search" className="element">
                    <Row id='pol-search-row'>
                        <SimpleMap/>
                    </Row>
                </Scroll.Element>   

                <Row id='bill-row'>    
                    <Scroll.Element name="bill-search" className="element">
                        <Row>
                            <Col>
                                <RecentBillCard/>
                            </Col>
                            <Col>
                                <Row id='bill-directions'>
                                    <h3>To search bills, simply enter a term (ex: gun control or entitlement reform) and submit. We'll look thru our database for any related bills.</h3>
                                    <BillForm isNavbar={false}/>
                                    
                                    <h3>...need some inspiration? Take a look at some recently discussed bills right here!</h3>
                                    <Col><FaArrowLeft className='text-center' size='10em'/></Col>
                                </Row>
                            </Col>
                            
                        </Row>
                    </Scroll.Element>
                </Row>

        </Container>
    )
}



export default Hompage; 

            // {/* <Tabs defaultActiveKey='politicians' mountOnEnter>
            //     <Tab eventKey='politicians' title='Search Politicians'> */}
            //     <Scroll.Element name="test1" className="element">
            //         <Row>
            //             <SimpleMap/>
            //         </Row>
            //     </Scroll.Element>
            //     {/* </Tab>
            //     <Tab eventKey='bills' title='Search Bills'> */}
            //         <Row id='bill-row'>    
            //             <Col>
            //                 <Row id='bill-directions'>
            //                     <h3>To search bills, simply enter a term and submit. We'll look thru our database for any related bills.</h3>
            //                     <BillForm/>
            //                     <h3>Need some inspiration? Take a look at some recently discussed bills right here!</h3>
            //                     <Col><FaArrowRight className='text-center' size='10em'/></Col>
            //                 </Row>
            //             </Col>
            //             <Col>
            //                 <RecentBillCard/>
            //             </Col>
            //         </Row>
            //     {/* </Tab>
            // </Tabs> */}



            {/* <Row>
                
                <Col>

                    <Row id='address-search-row'>
                        <Col>
                            <h2>Search For a Politician<Modal message={addressSearch}/></h2>
                            <AddressSearch/>
                        </Col>
                    </Row>

                    <Row id='bill-search-row'>
                        <Col>
                            <h2>Search For a Bill<Modal message={billSearch}/></h2>
                            <BillForm/>
                        </Col>
                    </Row>
                    
                </Col>
                <Col>
                    <h2>Recent Bills</h2>
                    <RecentBillCard/>
                </Col>
            </Row> */}


            
            // <Row>
            //     <Col>
            //         <Row>
            //             <h2>I want to learn about politicians.</h2>
            //         </Row>

            //         <Row>
            //             <Col>
            //                 <FaArrowDown size='10em' color='white'/>
            //             </Col>
            //         </Row>
            //     </Col>
{/* <Row>
                <Col>
                    <FaArrowDown size='10em' color='white'/>
                </Col>
            </Row> */}

            //     <Col><h2>I want to read about bills.</h2></Col>
            // </Row>