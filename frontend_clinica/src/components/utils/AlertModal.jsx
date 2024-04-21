import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import Alert from 'react-bootstrap/Alert';
/*

  const [showAlert, setShowAlert] = useState(false);

  setShowAlert(true);

  
 <AlertModal
                  title="Atención"
                  message="No se encontraron tratamientos."
                  showAlert={showAlert}
                  setShowAlert={setShowAlert}
                />

*/


function AlertModal({ title, message, showAlert, setShowAlert }) {
  const handleClose = () => setShowAlert(false);

  return (
    <>
      {showAlert && (
        <Modal centered animation={false} show={showAlert} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p>{title} </p><br />


              <Alert key='primary' variant='primary' >
                  {message}
                
              </Alert>
            </Modal.Title>
          </Modal.Header>

        </Modal>
      )}
    </>
  );
}

export default AlertModal;
