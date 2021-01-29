import Card from 'react-bootstrap/Card'; 
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs'; 
import BillStatus from './BillStatus';
import BillTimeline2 from './BillTimeline2';
import BillLinks from './BillLinks'; 
import CosponsorCardBody from './CosponsorCardBody'; 
import {slimItDown} from './../helpers/helpers'; 
import Badge from 'react-bootstrap/Badge';
import flourish from './../images/flourish.gif';
import './BillCard.css'; 

const BillCard = ({bill}) => {
    return(
        <Card>
            <Card.Header as='h3' className={bill.active ? 'isActive' : 'isInactive'}><b>Bill Details</b><Badge className='float-right' variant={bill.active ? "success" : "danger"}>Bill is {bill.active ? "Active" : "Inactive"}</Badge></Card.Header>

            <Tabs defaultActiveKey='text'>
            <hr/>

                <Tab eventKey='billTimeline' title='Bill Timeline'>
                <img src={flourish} style={{width:"10%", height:"10%"}}/>
                    <BillTimeline2 bills={slimItDown(bill.actions)}/>
                </Tab>

                <Tab eventKey='lastAction' title='Last Action'>
                <img src={flourish} style={{width:"10%", height:"10%"}}/>
                    <BillStatus bill={bill.actions[0]}/>
                </Tab>

                <Tab eventKey='sponsors' title="Sponsors">
                <img src={flourish} style={{width:"10%", height:"10%"}}/>
                    <CosponsorCardBody billId={bill.bill_id}/>
                </Tab>

                <Tab eventKey='links' title="Links">
                <img src={flourish} style={{width:"10%", height:"10%"}}/>
                    <BillLinks bill={bill}/>
                </Tab>

                <Tab eventKey='text' title="Bill Summary">
                <img src={flourish} style={{width:"10%", height:"10%"}}/>
                    <Card.Body>
                        <p>{bill.summary==="" ? bill.title : bill.summary}</p>
                        <p>Full Bill Text Available <a href={`${bill.congressdotgov_url}/text`}>here.</a></p>
                    </Card.Body>
                </Tab>

            </Tabs>
        </Card>
    )
}

export default BillCard; 