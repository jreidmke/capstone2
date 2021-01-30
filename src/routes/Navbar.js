import { GiCongress } from 'react-icons/gi'; 
import AddressForm from './../searches/AddressForm';
import BillForm from './../searches/BillForm';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';

const NavBar = () => {
    return(
        <Navbar bg="light">
        <Navbar.Brand href="/home">
            <GiCongress className='float-left m-2' size='5em'/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <NavDropdown title="Navigation" id="basic-nav-dropdown">
                <NavDropdown.Item href="/senate">U.S. Senators</NavDropdown.Item>
                <NavDropdown.Item href="/house">U.S. Representatives</NavDropdown.Item>
            </NavDropdown>
            </Nav>
            <Form inline>
                <BillForm isNavbar={true}/>
                <AddressForm isNavbar={true}/>
            </Form>
        </Navbar.Collapse>
        </Navbar>
    )
};



export default NavBar;
