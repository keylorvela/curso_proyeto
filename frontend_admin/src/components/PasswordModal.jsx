import { Button, Modal, Form } from 'react-bootstrap';
import styles from 'src/components/Common.module.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

import UserService from 'src/services/User.service';

function PasswordModal({ hide, handleState, passInfo, setPassInfo, userID }) {

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formVal = event.currentTarget;

    if (!formVal.checkValidity()) {
        event.stopPropagation();
    }
    else if (passInfo.new_pass != passInfo.conf_pass) {
        alert("Contraseñas nuevas not match");
    }
    else {

        const response = await UserService.ChangePassword(userID, passInfo.og_pass, passInfo.new_pass);
        setPassInfo({});

        if (response.o_status.includes("Error")) {
            alert("Contraseña no es la actual")
        }
        else {
            alert("Se cambio la contraseña!")
            handleClose();
        }
    }
};


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
                                    type="password"
                                    placeholder="Digite su contraseña actual"
                                    onChange = {(e) => handleChange(e, 'og_pass')}
                                />
                            </Form.Group>
                            <Form.Group className = "mb-3" md="4" controlId="validationCustom02">
                                <Form.Label  className={`fs-5 ${styles.label}`}>Nueva contraseña</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="Digite su nueva contraseña"
                                    onChange = {(e) => handleChange(e, 'new_pass')}
                                />
                            </Form.Group>
                            <Form.Group className = "mb-3"  md="4" controlId="validationCustom03">
                                <Form.Label  className={`fs-5 ${styles.label}`}>Repetir contraseña</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
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