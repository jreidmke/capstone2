import { Link } from 'react-router-dom'
import {isEmpty, formatBillId} from './../helpers/helpers';
import './VoteRow.css';

const VoteRow = ({bill}) => {
    let link;
    let billId = bill.bill.bill_id;
    let titleTxt;
    if(isEmpty(bill.bill) || billId === undefined) {
        link = <td>{bill.question}</td>
        titleTxt = bill.description;
    } else if(billId.slice(0,2) === 'hr' || billId.slice(0,2) === 'sr') {
        link = <td><Link to={`/bills/${bill.bill.bill_id}`}>{formatBillId(billId)}</Link></td>
        titleTxt = bill.description;
    } else if(billId.slice(0,2) === 'pn') {
        link = <td>{formatBillId(billId)}</td>
        titleTxt = bill.description;
    } else {
        link = <td>{bill.question}</td>
        titleTxt = <td>{bill.question}</td>
    }


    return(
        <tr>
            {link}
            <td>{titleTxt}</td>
            <td className={bill.position==='No' ? 'noVote' : 'yesVote'}>{bill.position}</td>
            <td className={bill.result==='Failed' ? 'noVote' : 'yesVote'}>{bill.result}</td>            
        </tr>
    )
};

export default VoteRow;
{/* <Link to={`/noms/${bill.nomination.number.toUpperCase()}`}></Link> */}

