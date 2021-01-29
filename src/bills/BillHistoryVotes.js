import Table from 'react-bootstrap/Table';


const BillHistoryVotes = ({votes}) => {

    return(
        
        <Table striped bordered hover variant="light">
            <thead>
                <tr>
                    <td>Date</td>
                    <td>Question</td>
                    <td>Chamber</td>
                    <td>Yes Votes</td>
                    <td>No Votes</td>
                    <td>Not Voting</td>
                    <td>Result</td>
                </tr>
            </thead>
            
                <tbody>
                    {votes.map(v => (
                        <tr>
                            <td>{v.date}</td>
                            <td>{v.question}</td>
                            <td>{v.chamber}</td>
                            <td>{v.total_yes}</td>
                            <td>{v.total_no}</td>
                            <td>{v.total_not_voting}</td>
                            <td>{v.result}</td>
                        </tr>
                    ))}
                </tbody>
        </Table>
    )
}

export default BillHistoryVotes;