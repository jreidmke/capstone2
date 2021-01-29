import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {searchBills} from './../api/api';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import {FaCheck, FaTimes} from 'react-icons/fa'; 
import {dateTimeFormatter} from './../helpers/helpers';
import './BillSearchResults.css'; 

const BillSearchResults = () => {
    const {searchTerm} = useParams();
    const [results, setResults] = useState();

    useEffect(() => {
        async function getResults() {
            const resp = await searchBills(searchTerm);
            setResults(resp);
        }
        getResults();
    }, []); 


    return(
        <Container>
            <Row>
                <Col>
                    <h1>Search Results for: {searchTerm}</h1>
                </Col>
            </Row>
        {console.log(results)}
            <Table striped bordered hover variant='light'>
                <thead>
                    <tr>
                        <td>Bill ID</td>
                        <td>Bill Title</td>
                        <td>Bill Sponsor</td>
                        <td>Last Major Action</td>
                        <td>Is Active?</td>
                    </tr>
                </thead>
                <tbody>
                    {results ? results.map(r => (
                        <tr>
                            <td><Link to={`/bills/${r.bill_id}`}>{r.bill_id.toUpperCase()}</Link></td>
                            <td>{r.short_title}</td>
                            <td className={r.sponsor_party==="R" ? "red" : "blue"}><Link to={`/${r.sponsor_title==="Rep" ? 'house' : 'senate'}/${r.sponsor_id}`}>{r.sponsor_name}</Link></td>
                            <td>On <b>{dateTimeFormatter(r.latest_major_action_date)}</b>: {r.latest_major_action}</td>
                            <td className={r.active ? "green" : "red"}>{r.active ? <FaCheck/> : <FaTimes/> }</td>
                        </tr>
                    )) : 'Loading'}
                </tbody>
            </Table>

        </Container>
    )
}

export default BillSearchResults; 

// bill_id

// short_title

// sponsor

// status