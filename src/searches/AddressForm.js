import {useState} from 'react';
import {PropublicaApi} from './../api/api';
import {useHistory} from 'react-router-dom';
import Button from 'react-bootstrap/Button'; 
import './BillForm.css'; 

const AddressForm = ({isNavbar}) => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        address: ""
    });

    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const resp = await PropublicaApi.getOCDStringByAddress(formData.address);
        history.push(`/pols/${resp}`);
    };

    return(
        <form>
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
