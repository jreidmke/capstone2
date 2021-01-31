import Table from 'react-bootstrap/Table';


const BillHistoryActions = ({actions}) => {

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
                    {actions.map(a => (
                        <tr>
                            <td>{a.datetime}</td>
                            <td>{a.chamber}</td>
                            <td>{a.action_type}</td>
                            <td>{a.description}</td>
                        </tr>
                    ))}
                </tbody>
        </Table>
    )
}

export default BillHistoryActions;
