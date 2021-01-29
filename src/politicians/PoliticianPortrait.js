import Image from 'react-bootstrap/Image';

const PoliticianPortrait = ({pol}) => {
    return(
    <Image src={`https://theunitedstates.io/images/congress/450x550/${pol.id}.jpg`} rounded/>
    )
};

export default PoliticianPortrait;