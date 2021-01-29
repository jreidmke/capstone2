import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import VoteList from './VoteList';
import CosponoredBills from './CosponsoredBills';

const VotesAndSponsoredBills = ({votes, bills}) => {
    return(
        <div>
            <Tabs defaultActiveKey='votes'>

                <Tab eventKey='votes' title='Recent Votes'>
                    <VoteList votes={votes}/>
                </Tab>

                <Tab eventKey='bills' title='Cosponsored Bills'>

                    <CosponoredBills bills={bills}/>
                </Tab>

            </Tabs>
        </div>
    )
};

export default VotesAndSponsoredBills; 