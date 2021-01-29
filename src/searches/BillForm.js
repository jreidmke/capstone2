import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Button from 'react-bootstrap/Button'; 
import './BillForm.css'; 

const BillForm = ({isNavbar}) => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        term: ""
    });

    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("PIZZA")
        history.push(`/bills/search/${formData.term}`);
    };

    return(
        <form>
            <input
            type='text'
            placeholder={isNavbar ? "Search Bills" : "Health Care"}
            name='term'
            id='term'
            onChange={handleChange}
            value={formData.term}
            className={isNavbar ? "isNavbar" : "isNotNavbar"}
            />
            <Button onClick={handleSubmit} variant='info' className={isNavbar ? 'ml-2 mb-1': 'mb-3 ml-2'}>{isNavbar ? "Go" : "Submit"}</Button>
        </form>
    )
}

export default BillForm;
