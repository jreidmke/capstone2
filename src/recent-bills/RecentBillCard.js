import Card from 'react-bootstrap/Card';
import Tabs from 'react-bootstrap/Tabs'; 
import Tab from 'react-bootstrap/Tab';
import RecentBillCardBody from './RecentBillCardBody'; 

const RecentBillCard = () => {
    return(
        <Card>
            <Tabs defaultActiveKey='active' mountOnEnter>


                <Tab eventKey='introduced' title="Introduced">
                    <RecentBillCardBody status="introduced"/>
                </Tab>

                <Tab eventKey='active' title="Active">
                    <RecentBillCardBody status='active'/>
                </Tab>

                <Tab eventKey="passed" title="Passed">
                    <RecentBillCardBody status="passed"/>
                </Tab>

                <Tab eventKey="enacted" title="Enacted">
                    <RecentBillCardBody status="enacted"/>
                </Tab>
            </Tabs>
        </Card>
    )

}

export default RecentBillCard; 