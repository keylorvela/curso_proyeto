import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import Stack from 'react-bootstrap/Stack';



/**
 * Component to render a Yes No Dialog
 *
 * @component
 * @param {string} question - Question for the user
 * @param {string} message - Context for the question
 * @param {boolean} showAlert - Alert's state, should be false by default
 * @param {function} setShowAlert - Handler function for the state
 * @param {function} handleYes - Handler function for the yes button
 * @returns {JSX.Element} The rendered loading component.
 *
 * @example
 *   const [showAlert, setShowAlert] = useState(false);

  setShowAlert(true);

  
 <YesNoModal

                question="Está seguro que se desea continuar?"
                message="Esta acción es irreversible"
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                handleYes={handle}

            />
   
* */
function YesNoModal({ question, message, showAlert = false, setShowAlert, handleYes }) {
    const handleClose = () => setShowAlert(false);

    return (
        <>
            {showAlert && (
                <Modal   centered animation={false} show={showAlert} onHide={handleClose}>
                    <Modal.Body className = 'px-0 py-0'>
                        <Alert className = 'px-3 py-3 mx-0 my-0' key="info" variant="info" >

                            <Stack gap={3}>
                                <h3 className='fs-3 fw-bold'> {question} </h3>
                                <p className = 'fs-5' >{message}</p>
                                <div className='d-flex flex-row-reverse'>
                                    <Button onClick = {handleYes} className = 'px-4 mx-2' size="lg" variant="danger" > Sí</Button>
                                    <Button onClick = {handleClose} className = 'px-4 mx-2' size="lg" variant="warning">No</Button>
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

export default YesNoModal;
