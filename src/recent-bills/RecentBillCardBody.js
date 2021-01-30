import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {useState, useEffect} from 'react';
import {getRecentBills} from './../api/api';
import LoadingSpinner from './../common/LoadingSpinner'; 
import { Link } from 'react-router-dom'; 
import {PropublicaApi} from './../api/api2';

const RecentBillCardBody = ({status}) => {
    const [bills, setBills] = useState();

    useEffect(() => {
        async function getBills() {
            const resp = await PropublicaApi.getRecentBills(status);
            setBills(resp);
        }
        getBills();
    }, []); 
    return(
        <Card.Body>
            <ListGroup>
                {bills ? bills.slice(0, 10).map(b => (
                    <ListGroup.Item><Link to={`/bills/${b.bill_id}`}>{b.short_title}</Link></ListGroup.Item>
                )) : <LoadingSpinner/>}
            </ListGroup>
        </Card.Body>
    )

}

export default RecentBillCardBody; 