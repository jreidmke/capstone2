import Table from 'react-bootstrap/Table';
import VoteRow from './VoteRow';


const VoteList = ({votes}) => {

    return(
        <div>
        <Table striped bordered hover variant="light">
            <thead>
                <tr>
                    <td>Bill Number</td>
                    <td>Bill Title</td>
                    <td>Voted...</td>
                    <td>Result</td>
                </tr>
            </thead>
        {console.log(votes)}
            <tbody>
                {votes.map(v => <VoteRow bill={v}/>)}
            </tbody>
        </Table>
        </div>
    )
}


export default VoteList;