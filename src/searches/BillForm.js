import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Button from 'react-bootstrap/Button'; 
import './BillForm.css'; 
import Alert from 'react-bootstrap/Alert';

const BillForm = ({isNavbar}) => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        term: ""
    });
    const [error, setError] = useState([]); 

    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setError([]);
        }, 3000);
        return () => clearTimeout(timeout);
    }, [error]);

    const handleSubmit = async(e) => {
        console.log(history); 
        e.preventDefault();
        if(formData.term.length > 2) {
            history.push('/');
            history.push(`/bills/search/${formData.term}`); 
            console.log("Here");
            // history.location.pathname=`/bills/search/${formData.term}`
            return;
        } else {
            setError('Minimum term length is 3 (ex: cat).')
        }
    };

    return(
        <form onSubmit={handleSubmit}>
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
            <br/>{error.length ? <Alert variant='danger' id='alert'>{error}</Alert> : ''}
        </form>
    )
}

export default BillForm;


{/* <Button onClick={handleSubmit} variant='info' className={isNavbar ? 'ml-2 mb-1': 'mb-3 ml-2'}>{isNavbar ? "Go" : "Submit"}</Button> */}
