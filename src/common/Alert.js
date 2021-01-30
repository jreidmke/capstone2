import Alert from 'react-bootstrap/Alert';
import {useState} from 'react';

const CustomAlert = ({color, message}) => {
    const [isShowing, setIsShowing] = useState(true); 

    if(isShowing) {
        return(
            <Alert variant={color} dismissible onClose={() => setIsShowing(false)}><b>{message}</b></Alert>
            )
    };
        return(
            <div></div>
        )
    };

export default CustomAlert;

