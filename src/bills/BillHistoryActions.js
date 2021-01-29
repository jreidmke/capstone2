import Table from 'react-bootstrap/Table';


const BillHistoryActions = ({votes}) => {

    return(
        
        <Table striped bordered hover variant="light">
            <thead>
                <tr>
                    <td>Date</td>
                    <td>Chamber</td>
                    <td>Action Type</td>
                    <td>Description</td>
                </tr>
            </thead>
            
                <tbody>
                    {votes.map(v => (
                        <tr>
                            <td>{v.datetime}</td>
                            <td>{v.chamber}</td>
                            <td>{v.action_type}</td>
                            <td>{v.description}</td>
                        </tr>
                    ))}
                </tbody>
        </Table>
    )
}

export default BillHistoryActions;
