import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getBillsByPolitician, getCosponsoredBills, PropublicaApi} from './../api/api';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import LoadingSpinner from './../common/LoadingSpinner';
import PoliticianBillboard from './PoliticianBillboard';
import EmptyPolBillboard from './../empty-components/EmptyPolBillboard';
import VotesAndSponsoredBills from './../votes/VotesAndSponsoredBills';
import ContributionList from './../contributions/ContributionList';

const PoliticianDetails = () => {
    const {id} = useParams();
    const [politician, setPolitician] = useState();
    const [bills, setBills] = useState();
    const [role, setRole] = useState();
    const [cosponsoredBills, setcosponsoredBills] = useState(); 

    useEffect(() => {
        async function getBills() {
            // const p = await getPoliticianById(id);
            const p = await PropublicaApi.getPoliticianById(id);
            const resp = await getBillsByPolitician(id);
            const csResp = await getCosponsoredBills(id);
            setcosponsoredBills(csResp);
            setPolitician(p);
            setRole(p.roles[0]);
            setBills(resp);
        }
        getBills();
    }, [id]);

    return(
        <Container>
            <Row><Col>{politician && role ? <h1>{role.title} {politician.first_name} {politician.last_name} ({role.state}-{role.party})</h1> : <LoadingSpinner/>}</Col></Row>
            <Row>
                <Col>
                    {politician ? <PoliticianBillboard politician={politician}/> : <EmptyPolBillboard/>}
                </Col>

                <Col>
                {politician ? <TwitterTimelineEmbed
                sourceType="profile"
                screenName={politician.twitter_account}
                options={{height: 600}}
                /> : <LoadingSpinner/>}
                </Col>
            </Row>


                    <br/>

            {/* <Row>
                <Col>
                    {politician && role ? <h4>Recent Votes from {role.title} {politician.last_name}<Modal message={repeatingBills}/></h4> : ""}
                    {bills ? <VoteList votes={bills}/> : <LoadingSpinner/>}
                </Col>
                <Col>
                    {politician && role ? <h4>Cosponored Bills from {role.title} {politician.last_name}<Modal message={whatsASponsor}/></h4> : ""}

                    {cosponsoredBills ? <CosponsoredBills bills={cosponsoredBills}/> : "pizza"}
                </Col>
            </Row> */}

            <Row>
                <Col>
                    {bills && cosponsoredBills ? <VotesAndSponsoredBills votes={bills} bills={cosponsoredBills}/> : <LoadingSpinner/>}
                </Col>

                <Col>
                    <ContributionList/>
                </Col>
            </Row>

        </Container>
    )
}

export default PoliticianDetails;
