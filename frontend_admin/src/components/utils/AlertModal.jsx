import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import Stack from 'react-bootstrap/Stack';

/**
 * Component to render an alert
 *
 * @component
 * @param {string} type - Alert's type
 * @param {string} title - Alert's title
 * @param {string} message - Alert's content
 * @param {boolean} showAlert - Alert's state, should be false by default
 * @param {function} setShowAlert - Handler function for the state
 * @returns {JSX.Element} The rendered loading component.
 *
 * @example
 *   const [showAlert, setShowAlert] = useState(false);
 *
    const [alert, setAlert] = useState({ type: '', title: '', msg: '' });

    setShowAlert(true);

    setAlert({..., msg : 'mensaje'});

    <AlertModal
        type={alert.type}
        title={alert.title}
        message={alert.msg}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
    />

* */


function AlertModal({ type, title, message, showAlert = false, setShowAlert }) {
    const handleClose = () => setShowAlert(false);

    return (
        <>
            {showAlert && (
                <Modal centered animation={false} show={showAlert} onHide={handleClose}>
                    <Modal.Body className = 'px-0 py-0'>
                        <Alert className = 'px-3 py-3 mx-0 my-0' key={type} variant={type}>

                            <Stack gap={3}>
                                <h3 className='fs-4 fw-bold'> {title} </h3>
                                <p className = 'fs-5 text-center' >{message}</p>
                                <div className='d-flex flex-row-reverse'>
                                    <Button onClick = {handleClose} className = 'px-4 mx-2' size="md" variant="success">Ok</Button>
                                </div>
                            </Stack>
                        </Alert>
                    </Modal.Body>

                </Modal >
            )
            }
        </>
    );
}

export default AlertModal;
