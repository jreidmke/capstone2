import ListGroup from 'react-bootstrap/ListGroup';
import {useState} from 'react';
import Collapse from 'react-bootstrap/Collapse';

const StatementList = ({statements}) => {
    const [open, setOpen] = useState(false);

    return(


        <ListGroup>
            {statements.slice(0, 2).map(s => <ListGroup.Item><a href={s.url}>{s.title}</a></ListGroup.Item>)}
            <Collapse in={open}>
                <div>
                    {statements.slice(2).map(s => <ListGroup.Item><a href={s.url}>{s.title}</a></ListGroup.Item>)}
                </div>
            </Collapse>
            <ListGroup.Item>
                <a onClick={()=>setOpen(!open)} aria-expanded={open}>Click to {open ? "Close" : "See More"} Statements</a>
            </ListGroup.Item>
        </ListGroup>

    );
}

export default StatementList; 
