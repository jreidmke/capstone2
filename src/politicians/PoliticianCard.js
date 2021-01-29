import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons'

const PoliticianCard = ({pol, chamber}) => {


    const stateAndParty = 'roles' in pol ? `(${pol.roles[0].state}-${pol.roles[0].party})` : `(${pol.party}-${pol.state})`
    chamber = 'roles' in pol ? pol.roles[0].chamber.toLowerCase() : chamber; 

    return(
        <Card style={{
            width: '18em',
            minWidth: "20%",
            flexGrow: 0
          }}>
            <Card.Img src={`https://theunitedstates.io/images/congress/450x550/${pol.id}.jpg`} />
            <Card.Body>
                <Card.Title><Link to={`/${chamber}/${pol.id}`}>{pol.first_name} {pol.last_name} </Link>{stateAndParty}</Card.Title>
                <Card.Subtitle>{pol.role}</Card.Subtitle>
                <Card.Link href={`http://www.twitter.com/${pol.twitter_account || pol.twitter_id}`}><FontAwesomeIcon icon={faTwitter}/></Card.Link>
                <Card.Link href={`http://www.facebook.com/${pol.facebook_account}`}><FontAwesomeIcon icon={faFacebook}/></Card.Link>
                <Card.Link href={`http://www.youtube.com/${pol.youtube_account || pol.youtube_id}`}><FontAwesomeIcon icon={faYoutube}/></Card.Link>
            </Card.Body>
        </Card>
    )
}

export default PoliticianCard;

// {role.state}-{role.party}