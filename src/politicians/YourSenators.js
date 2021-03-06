import Carousel from 'react-bootstrap/Carousel';
import PoliticianCard from './PoliticianCard';

const YourSenators = ({senators}) => {
    return(
            <Carousel indicators={false}>
                <Carousel.Item>
                    <PoliticianCard pol={senators[0]} chamber='senate' needLocale={false}/>
                </Carousel.Item>
                <Carousel.Item>
                    <PoliticianCard pol={senators[1]} chamber='senate' needLocale={false}/>
                </Carousel.Item>
            </Carousel>
    )
}

export default YourSenators;