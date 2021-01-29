import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

const CosponsorRow = ({cosponsor}) => {
    const cham = cosponsor.cosponsor_title === "Rep." ? 'house' : 'senate';
    return(
        <ListGroup.Item variant={cosponsor.cosponsor_party==="R" ? 'danger' : 'primary'}>
            <Link to={`/${cham}/${cosponsor.cosponsor_id}`}>
                {cosponsor.name} ({cosponsor.cosponsor_state}-{cosponsor.cosponsor_party})
            </Link>
        </ListGroup.Item>
    )
};

export default CosponsorRow;
