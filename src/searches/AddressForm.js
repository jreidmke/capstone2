import {useEffect, useState} from 'react';
import { getOCDStringByAddress} from './../api/api';
import {useHistory} from 'react-router-dom';
import Button from 'react-bootstrap/Button'; 
import Alert from 'react-bootstrap/Alert';
import './BillForm.css'; 

const AddressForm = ({isNavbar}) => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        address: ""
    });
    const [error, setError] = useState([]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setError([]);
        }, 3000);
        return () => clearTimeout(timeout);
    }, [error]); 

    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const resp = await getOCDStringByAddress(formData.address);
        if(resp.slice(0, 3) === 'ocd') {
            history.push(`/pols/${resp}`);
        } else {
            setError(resp);
        }

    };

    return(
        <form>
            {error.length ? <Alert variant='danger'>{error}</Alert> : ''}
            <input
            type='text'
            placeholder={isNavbar ? "Search Address" : "123 Pizza St. Milwaukee, WI"}
            name='address'
            id='address'
            onChange={handleChange}
            value={formData.address}
            className={isNavbar ? "isNavbar" : "isNotNavbar"}
            />
            <Button onClick={handleSubmit} variant='info' className={isNavbar ? 'ml-2 mb-1': 'mb-3 ml-2'}>{isNavbar ? "Go" : "Submit"}</Button>
        </form>
    )
}

export default AddressForm;
