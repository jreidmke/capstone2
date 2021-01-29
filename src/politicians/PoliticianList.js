import {useState, useEffect} from 'react';
import PoliticianCard from './PoliticianCard';
import {getAllPoliticians} from './../api/api';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

const PoliticianList = ({chamber}) => {
    const [politicians, setPoliticians] = useState();

    useEffect(() => {
        async function getPols() {
            const resp = await getAllPoliticians(chamber);
            setPoliticians(resp.results[0].members.sort((a, b) => {
                let textA = a.state.toUpperCase();
                let textB = b.state.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            }));
        }
        getPols();
    }, [chamber]);

    const cham = chamber === 'senate' ? "Senator" : "Representative"

    return(
        <Container>
            <Col/>
            <h1>{cham} List</h1>
            <CardDeck>

                {!politicians ?  `Loading ${cham}s` : politicians.map(p => 
                <PoliticianCard pol={p} chamber={chamber}/>)}
            </CardDeck>
            <Col/>
        </Container>
    )
}

export default PoliticianList;
