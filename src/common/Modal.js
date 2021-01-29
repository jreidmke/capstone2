import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

  function CustomModal({message}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>

        <a><FontAwesomeIcon icon={faQuestionCircle} onClick={handleShow} className='ml-3'/></a>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{message.heading}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{message.body}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default CustomModal; 