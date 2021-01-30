import Card from 'react-bootstrap/Card';

const InfoCard = ({pol, chamber}) => {
    return(
        <a href={`/${chamber}/${pol.id}`}>
            <Card style={{width: '12em'}}>
                <Card.Img src={`https://theunitedstates.io/images/congress/450x550/${pol.id}.jpg`}/>
                <Card.Title>{pol.first_name} {pol.last_name} ({pol.party})</Card.Title>
            </Card>
        </a>
    )
}

export default InfoCard