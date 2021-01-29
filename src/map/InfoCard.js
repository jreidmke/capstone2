import Card from 'react-bootstrap/Card';

const InfoCard = ({pol, chamber}) => {
    return(
        <Card style={{width: '7em'}}>
            <Card.Img src={`https://theunitedstates.io/images/congress/450x550/${pol.id}.jpg`}/>
            <Card.Title><a href={`/${chamber}/${pol.id}`}>{pol.first_name} {pol.last_name} ({pol.party})</a></Card.Title>
        </Card>
    )
}

export default InfoCard