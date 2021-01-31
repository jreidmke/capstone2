import Table from 'react-bootstrap/Table';
import {dateTimeFormatter} from '../helpers/helpers';
import { Link } from 'react-router-dom'; 
import {FaCheck, FaTimes} from 'react-icons/fa';
import './../searches/BillSearchResults.css';

const CosponsoredBills = ({bills}) => {

    return(
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <td>Bill Number</td>
                    <td>Bill Title</td>
                    <td>Introduced</td>
                    <td>Last Action</td>
                    <td>Active</td>
                </tr>
            </thead>
            <tbody>
                {bills.map(b => (
                    <tr>
                        <td><Link to={`/bills/${b.bill_id}`}>{b.bill_id.toUpperCase()}</Link></td>
                        <td>{b.title}</td>
                        <td>{dateTimeFormatter(b.introduced_date)}</td>
                        <td>{b.latest_major_action} on {dateTimeFormatter(b.latest_major_action_date)}</td>
                        <td className={b.active ? "green" : "red"}>{b.active ? <FaCheck/> : <FaTimes/> }</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default CosponsoredBills; 