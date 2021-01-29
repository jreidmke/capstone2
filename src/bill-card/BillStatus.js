import Card from 'react-bootstrap/Card'

const BillStatus = ({bill}) => {

    const cardTitle = bill.description === "Presented to President." ? "this bill is out of congress" : `this bill is in the ${bill.chamber}.`;

    return(

        <Card.Body>
            <Card.Title>As of {bill.datetime}, {cardTitle}</Card.Title>
            <Card.Text>
                The last action was: <b>{bill.description}</b>
            </Card.Text>
        </Card.Body>

    )
}

export default BillStatus; 