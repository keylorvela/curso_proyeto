import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function BaseModal({ pshow = false, setShow, children }) {
    const handleClose = () => setShow(false);


    return (
        <Modal
            animation={false}
            show={pshow}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
}

export default BaseModal;
