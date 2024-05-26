import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

function LoadingModal({ pshow = false, setShow, msg='' }) {
    const handleClose = () => setShow(false);


    return (
        <Modal
            animation={false}
            show={pshow}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
        >
            <Modal.Body className="text-center">
                    <p className="fs-2 my-4"> {msg} </p>

                    <Spinner className="mb-3" animation="border" style={{ width: '7rem', height: '7rem'}} />

            </Modal.Body>
        </Modal>
    );
}

export default LoadingModal;


	


