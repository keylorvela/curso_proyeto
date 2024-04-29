import { Button, Modal, Form } from 'react-bootstrap';
import styles from 'src/components/Common.module.css'


function GroupModal({ hide, handleState, groupInfo, setGroupInfo }) {
    
    //TODO Fetch professors

    const handleChange = (e, fieldName) => {
        setGroupInfo({ ...groupInfo, [fieldName]: e.target.value });
    };

    const handleClose = () => handleState(false);

    return (
        <>
            <Modal show={hide} onHide={handleClose} animation={false} centered backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title className={styles.label}>Definir grupo</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form className = 'px-3'>
                        <Form.Group className='mb-3'>
                            <Form.Label className={`fs-5 ${styles.label}`} >Profesor:</Form.Label>
                            <Form.Select aria-label="Selecciona un profesor">
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Form.Group>


                        <Form.Label className={`fs-5 ${styles.label}`} >Elige los días:</Form.Label>
                        <Form.Group className={'text-center mb-3'}>
                            {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day, index) => (
                                <Form.Check key={index}
                                    inline
                                    label={day}
                                    name={day}
                                    type={'checkbox'}
                                    id={index}
                                />
                            ))}
                        </Form.Group>

                        <Form.Group className='mb-3' controlId="timeInput">
                            <Form.Label className={`fs-5 ${styles.label}`}>Selecciona una hora:</Form.Label>
                            <Form.Control
                                type="time"
                                value={groupInfo.hour}
                                onChange={(e) => handleChange(e.target.value, 'hour') }
                            />
                        </Form.Group>

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

export default GroupModal;