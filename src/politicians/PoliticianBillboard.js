import Container from 'react-bootstrap/Container';
import PoliticianContact from './PoliticianContact';
import './PoliticianBillboard.css'
import RolesTimeline from './../roles/RolesTimeline';
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import PoliticianPortrait from './PoliticianPortrait';
import CurrentTerm from './../roles/CurrentTerm';

const PoliticianBillboard = ({politician}) => {
    return(
        <Container id='billboard'>
            <Tabs defaultActiveKey="portrait">

                <Tab eventKey="portrait" title="Portrait">
                    <PoliticianPortrait pol={politician}/>
                </Tab>

                <Tab eventKey="contact" title="Contact">
                    <PoliticianContact pol={politician}/>
                </Tab>

                <Tab eventKey="timeline" title="Timeline">
                    <RolesTimeline pol={politician}/>
                </Tab>

                <Tab eventKey="currTerm" title="Current Term">
                    <CurrentTerm politician={politician.roles[0]}/>
                </Tab>

            </Tabs>
        </Container>
    )
};

export default PoliticianBillboard;
