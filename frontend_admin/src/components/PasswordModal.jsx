import { Button, Modal, Form } from 'react-bootstrap';
import styles from 'src/components/Common.module.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

function PasswordModal({ hide, handleState, passInfo, setPassInfo }) {

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formVal = event.currentTarget;
    if (!formVal.checkValidity()) {
        event.stopPropagation();
    } else {
        alert('¡El formulario se envió correctamente!');
        console.log(JSON.stringify(passInfo));
        setPassInfo({});
        setValidated(false);
    }

    setValidated(true);
};


    //TODO Fetch professors

    const handleChange = (e, fieldName) => {
        setPassInfo({ ...passInfo, [fieldName]: e.target.value });
    };

    const handleClose = () => handleState(false);

    return (
        <>
            <Modal show={hide} onHide={handleClose} animation={false} centered backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title className={styles.label}>Cambiar contraseña</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group className = "mb-3" md="4" controlId="validationCustom01">
                                <Form.Label  className={`fs-5 ${styles.label}`}>Contraseña actual</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Digite su contraseña actual"
                                    onChange = {(e) => handleChange(e, 'og_pass')}
                                />
                            </Form.Group>
                            <Form.Group className = "mb-3" md="4" controlId="validationCustom02">
                                <Form.Label  className={`fs-5 ${styles.label}`}>Nueva contraseña</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Digite su nueva contraseña"
                                    onChange = {(e) => handleChange(e, 'new_pass')}
                                />
                            </Form.Group>
                            <Form.Group className = "mb-3"  md="4" controlId="validationCustom03">
                                <Form.Label  className={`fs-5 ${styles.label}`}>Repetir contraseña</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Digite la contraseña nuevamente"
                                    onChange = {(e) => handleChange(e, 'conf_pass')}
                                />
                            </Form.Group>
                        </Row>
                        <Button type="submit">Cambiar contraseña</Button>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PasswordModal;