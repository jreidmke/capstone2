import data from './../data.json';
import Table from 'react-bootstrap/Table';
import {moneyFormatter} from './../helpers/helpers';

const ContributionList = ({id}) => {
    return(
        <div>
            <h3>Contributions to {data.response.contributors['@attributes'].cycle} Campaign</h3>
            <Table striped bordered hover variant='light'>
                <thead>
                    <tr>
                        <td>Contributor Name</td>
                        <td>Individual Contributions</td>
                        <td>PAC Contributions</td>
                        <td>Total Contributions</td>
                    </tr>
                </thead>
                <tbody>
                    {data.response.contributors.contributor.map(c => (
                        <tr>
                            <td>{c['@attributes'].org_name}</td>
                            <td>{moneyFormatter(c['@attributes'].indivs)}</td>
                            <td>{moneyFormatter(c['@attributes'].pacs)}</td>
                            <td>{moneyFormatter(c['@attributes'].total)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ContributionList; 


